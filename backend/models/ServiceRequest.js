const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema({
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
  description: { type: String, required: true },
  serviceAddress: { type: String, required: true },
  preferredDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "completed", "cancelled"],
    default: "pending",
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);
