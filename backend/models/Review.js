const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  professional: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professional",
    required: true,
  },
  serviceRequest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceRequest",
    required: true,
    unique: true,
  },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);
