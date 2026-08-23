const prisma = require("../config/db");

// Citizen applies to hold the fundraiser for an issue that government has
// marked crowdfunding_enabled. Requires KYC to already be 'verified'.
async function applyForCampaign(req, res) {
  try {
    const { issueId, goalAmount, closesAt } = req.body;

    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (user.kycStatus !== "verified") {
      return res.status(403).json({ message: "KYC verification required before holding a fundraiser" });
    }

    const issue = await prisma.issue.findUnique({ where: { id: issueId } });
    if (!issue || issue.status !== "crowdfunding_enabled") {
      return res.status(400).json({ message: "Issue is not open for crowdfunding" });
    }

    const campaign = await prisma.fundraiserCampaign.create({
      data: {
        issueId,
        holderUserId: req.user.id,
        goalAmount,
        closesAt,
        status: "pending_approval",
      },
    });

    return res.status(201).json(campaign);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Could not create campaign application" });
  }
}

// Government or admin approves the fundraiser holder, activating the campaign.
async function approveCampaign(req, res) {
  try {
    const { id } = req.params;
    const { governmentBodyId } = req.body;

    const campaign = await prisma.fundraiserCampaign.update({
      where: { id },
      data: {
        status: "active",
        approvedByGovernmentBodyId: governmentBodyId,
        approvedByAdminId: req.user.role === "admin" ? req.user.id : undefined,
      },
    });

    return res.json(campaign);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Could not approve campaign" });
  }
}

// Record a contribution. In production this is called from the eSewa
// success webhook/callback (see services/esewaService.js) after payment
// is verified server-side — never trust a client-reported amount directly.
async function recordContribution(req, res) {
  try {
    const { id } = req.params; // campaign id
    const { amount, esewaTransactionId, contributorUserId } = req.body;

    const result = await prisma.$transaction(async (tx) => {
      const contribution = await tx.contribution.create({
        data: {
          campaignId: id,
          contributorUserId: contributorUserId || null,
          amount,
          esewaTransactionId,
          status: "success",
        },
      });

      const campaign = await tx.fundraiserCampaign.update({
        where: { id },
        data: { currentAmount: { increment: amount } },
      });

      return { contribution, campaign };
    });

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Could not record contribution" });
  }
}

module.exports = { applyForCampaign, approveCampaign, recordContribution };
