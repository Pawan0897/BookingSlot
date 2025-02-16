const { default: mongoose } = require("mongoose");

const db_connection = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/bookingslot")
    .then(() => {
      console.log("Databse connected !!!!");
    })
    .catch((err) => {
      console.log("Not conected !!" + err);
    });
};
module.exports = { db_connection };
