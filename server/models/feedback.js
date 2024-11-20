import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Register",
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
  rating: { type: Number, required: true },
  comments: { type: String, required: true },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
