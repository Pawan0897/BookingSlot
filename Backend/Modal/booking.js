const { default: mongoose } = require("mongoose");

const { Schema } = mongoose;

const booking = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  slotId: {
    type: mongoose.Schema.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports.BOOKING = mongoose.model("booking", booking);
