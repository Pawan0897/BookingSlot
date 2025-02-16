const { default: mongoose } = require("mongoose");

const { Schema } = mongoose;

const user = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role:{
    type:String,
    enum:["admin","user"]
  },
  status: {
    type: String,
    enum: {
      values: ["active", "logout"],
    },
  },
});
module.exports.USER = mongoose.model("user", user);
