const mongoose = require("mongoose");

const professionalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  serviceCategory: {
    type: String,
    enum: ["electrician", "plumber", "carpenter", "painter", "AC technician"],
    required: true,
  },
  skills: [{ type: String }],
  experienceYears: { type: Number, min: 0, required: true },
  description: { type: String, default: "" },
  city: { type: String, required: true },
  serviceArea: { type: String, default: "" },
  phone: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Professional", professionalSchema);
