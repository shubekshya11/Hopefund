const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");
const {
  createIssue,
  listIssues,
  getIssue,
  updateIssueStatus,
} = require("../controllers/issueController");

const router = express.Router();

// Public transparency feed - no auth required to browse
router.get("/", listIssues);
router.get("/:id", getIssue);

// Citizen reports an issue
router.post("/", authMiddleware, requireRole("citizen"), createIssue);

// Government/admin moves an issue through its lifecycle
router.patch(
  "/:id/status",
  authMiddleware,
  requireRole("government", "admin"),
  updateIssueStatus
);

module.exports = router;
