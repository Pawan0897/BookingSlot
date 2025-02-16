const express = require("express");
const {
  BookingsList,
  AddSlot,
  GetSlot,
  SlotBook,
} = require("../Controller/slots");

const router = express.Router();
router.get("/list", BookingsList);

/********************** slot booked */
router.post("/booked", SlotBook);

/********************* Slot add */
router.post("/addslot", AddSlot);

/*************** grt slote */
router.get("/getslot", GetSlot);

module.exports = router;
