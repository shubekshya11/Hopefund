const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");
const {
  applyForCampaign,
  approveCampaign,
  recordContribution,
} = require("../controllers/campaignController");

const router = express.Router();

router.post("/", authMiddleware, requireRole("citizen"), applyForCampaign);
router.patch("/:id/approve", authMiddleware, requireRole("government", "admin"), approveCampaign);

// In production, prefer wiring this from a verified eSewa callback rather
// than exposing it directly to the client.
router.post("/:id/contributions", authMiddleware, recordContribution);

module.exports = router;
