const express = require("express");
const {createFeedback,getFeedback,getFeedbackById,updateFeedback,deleteFeedback} = require("../controllers/feedbackController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createFeedback); 
router.get("/", authMiddleware, isAdmin, getFeedback); 
router.get("/:id", authMiddleware, getFeedbackById);
router.put("/:id", authMiddleware, updateFeedback);
router.delete("/:id", authMiddleware, isAdmin, deleteFeedback);

module.exports = router;