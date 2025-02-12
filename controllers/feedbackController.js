const Feedback = require("../models/Feedback");

exports.createFeedback = async (req, res, next) => {
  try {
    const { orderId, rating, comment } = req.body;

    if (!orderId || !rating || !comment) {
      return res.status(400).json({ message: "Order ID, rating, and comment are required" });
    }

    const feedback = new Feedback({
      userId: req.user.id,  
      orderId,
      rating,
      comment
    });

    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    next(error);
  }
};

exports.getFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.find()
      .populate("userId", "name email")
      .populate("orderId", "totalPrice orderType"); 

    res.status(200).json(feedback);
  } catch (error) {
    next(error);
  }
};

exports.getFeedbackById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const feedback = await Feedback.findById(id)
      .populate("userId", "name email")
      .populate("orderId", "totalPrice orderType");

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json(feedback);
  } catch (error) {
    next(error);
  }
};

exports.updateFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    if (!rating && !comment) {
      return res.status(400).json({ message: "At least one field (rating or comment) must be updated" });
    }

    const feedback = await Feedback.findById(id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

  
    if (feedback.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized: You can only edit your own feedback" });
    }

    feedback.rating = rating || feedback.rating;
    feedback.comment = comment || feedback.comment;
    await feedback.save();

    res.status(200).json(feedback);
  } catch (error) {
    next(error);
  }
};

exports.deleteFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findById(id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    if (feedback.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized: You can only delete your own feedback" });
    }

    await feedback.deleteOne();
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    next(error);
  }
};
