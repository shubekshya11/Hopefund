const prisma = require("../config/db");

// Citizen: report a new issue
async function createIssue(req, res) {
  try {
    const { title, description, category, photos, locationText, latitude, longitude } = req.body;

    const issue = await prisma.issue.create({
      data: {
        reportedByUserId: req.user.id,
        title,
        description,
        category,
        photos: photos || [],
        locationText,
        latitude,
        longitude,
      },
    });

    return res.status(201).json(issue);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Could not create issue" });
  }
}

// Public feed - anyone can view, budget hidden unless isBudgetPublic
async function listIssues(req, res) {
  try {
    const { status, category, governmentBodyId } = req.query;

    const issues = await prisma.issue.findMany({
      where: {
        ...(status && { status }),
        ...(category && { category }),
        ...(governmentBodyId && { governmentBodyId }),
      },
      orderBy: { createdAt: "desc" },
      include: { campaign: true },
    });

    const sanitized = issues.map((issue) => ({
      ...issue,
      estimatedBudget: issue.isBudgetPublic ? issue.estimatedBudget : null,
    }));

    return res.json(sanitized);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Could not fetch issues" });
  }
}

async function getIssue(req, res) {
  try {
    const issue = await prisma.issue.findUnique({
      where: { id: req.params.id },
      include: { statusUpdates: true, campaign: { include: { contributions: true } } },
    });

    if (!issue) return res.status(404).json({ message: "Issue not found" });
    return res.json(issue);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Could not fetch issue" });
  }
}

// Government/admin: move an issue through its lifecycle, logging every
// transition to IssueStatusUpdate for the public transparency trail.
async function updateIssueStatus(req, res) {
  try {
    const { id } = req.params;
    const { status, note, estimatedBudget, isBudgetPublic, estimatedTimelineDate } = req.body;

    const issue = await prisma.issue.findUnique({ where: { id } });
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    const updated = await prisma.$transaction(async (tx) => {
      const result = await tx.issue.update({
        where: { id },
        data: {
          status: status || issue.status,
          estimatedBudget,
          isBudgetPublic,
          estimatedTimelineDate,
        },
      });

      await tx.issueStatusUpdate.create({
        data: {
          issueId: id,
          updatedByUserId: req.user.id,
          statusFrom: issue.status,
          statusTo: status || issue.status,
          note,
        },
      });

      return result;
    });

    return res.json(updated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Could not update issue" });
  }
}

module.exports = { createIssue, listIssues, getIssue, updateIssueStatus };
