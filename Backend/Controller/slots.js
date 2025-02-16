const { BOOKING } = require("../Modal/booking");
const { SLOTS } = require("../Modal/slot");
/************************** Slot Booking By user */
const SlotBook = async (req, res) => {
  const { email, name, slotId } = req.body;

  const findexist = await BOOKING.findOne({ email: email, slotId: slotId });
  if (findexist) {
    return res.send({
      statuscode: 400,
      message: "Allready registered !!!",
    });
  } else {
    const data = new BOOKING({
      name: name,
      email: email,
      slotId: slotId,
    });
    const save = await data.save();
    await SLOTS.updateOne(
      { _id: slotId },
      { $set: { isBooked: true } },
      { new: true }
    );

    return res.send({
      statuscode: 200,
      message: "Registered Successfully !!!",
      data: save,
    });
  }
};

/***************** Bookin List */
const BookingsList = async (req, res) => {
  const list = await BOOKING.aggregate([
    {
      $lookup: {
        from: "slots",
        let: {
          slotId: "$slotId",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: {
                  $eq: ["$_id", "$$slotId"],
                },
              },
            },
          },
        ],
        as: "BookedList",
      },
    },
    /********************* List */
    {
      $unwind: {
        path: "$BookedList",
      },
    },
    {
      $project: {
        name: 1,
        email: 1,
        BookedList: {
          StartTime: 1,
          EndTime: 1,
          isBooked: 1,
        },
        createdAt: 1,
      },
    },
  ]);
  return res.send({
    statuscode: 200,
    message: "List of Booking",
    data: list,
  });
};

/********************* Add Slots */
const AddSlot = async (req, res) => {
  const { StartTime, EndTime } = req.body;
  const time = new SLOTS({
    StartTime,
    EndTime,
  });
  const saveTime = await time.save();
  if (saveTime) {
    return res.send({
      statuscode: 200,
      message: "Add Slot Successfully !!!",
      data: saveTime,
    });
  } else {
    return res.send({
      statuscode: 400,
      message: "ASomething Wrong !!!",
    });
  }
};

/*********************** GEtSlots from db */
const GetSlot = async (req, res) => {
  const show = {
    StartTime: { $regex: new RegExp(req.query.StartTime, "i") },
    EndTime: { $regex: new RegExp(req.query.EndTime, "i") },
  };

  const slots = await SLOTS.aggregate([
    {
      $match: show,
    },
  ]);
  if (slots.length == 0) {
    return res.send({
      statuscode: 400,
      message: "No Slots",
    });
  } else {
    return res.send({
      statuscode: 200,
      message: "Slots Time !!!",
      data: slots,
    });
  }
};

module.exports = { BookingsList, SlotBook, AddSlot, GetSlot };
