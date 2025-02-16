const { default: mongoose } = require("mongoose");

const { Schema } = mongoose;

const slots = new Schema({
  StartTime: {
    type: String,
  },
  EndTime: {
    type: String,
  },
  CreatedAt:{
    type:Date,
    default:Date.now
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

module.exports.SLOTS = mongoose.model("slots", slots);
