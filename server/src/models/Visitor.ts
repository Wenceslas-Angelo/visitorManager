import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  nationalId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  startDateTime: {
    type: Date,
    default: new Date(),
  },
  endDateTime: {
    type: Date,
  },
  badgeNumber: {
    type: Number,
    required: true,
  },
});

const Visitor = mongoose.model("Visitor", visitorSchema);

export default Visitor;
