const { USER } = require("../Modal/user");

/********************** User Signin */
const userSignup = async (req, res) => {
  const { name, email, password, role } = req.body;

  const Email = email.toLowerCase();

  const emailexist = await USER.findOne({ email: Email });

  if (emailexist) {
    return res.send({
      statuscode: 400,
      message: "Email is already exist !!",
    });
  } else {
    const user = new USER({
      name: name,
      email: Email,
      password: password,
      role: role,
    });
    const data = await user.save();
    return res.send({
      statuscode: 200,
      message: "Signup Successfully !!!",
      data: data,
    });
  }
};
/********************** Login the user  */
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const emailcheckr = await USER.findOne({ email: email });
  const passwordcheck = await USER.findOne({ password: password });
  if (!emailcheckr) {
    return res.send({
      statuscode: 400,
      message: "Email is not exist !!!",
    });
  } else if (!passwordcheck) {
    return res.send({
      statuscode: 400,
      message: "Pasword is Wrong !!!",
    });
  } else {
    await USER.updateOne(
      {
        email: emailcheckr?.email,
      },
      { $set: { status: "active" } },
      { new: true }
    );
    return res.send({
      statuscode: 200,
      message: "You Are logged in!!!",
      data: emailcheckr,
    });
  }
};

/****************************** Bookings lists */
/********************* Logout */
const UserLogout = async (req, res) => {
  const { email } = req.body;
  console.log(email, ">.......................");

  const existemail = await USER.findOne({ email: email });
  if (existemail) {
    await USER.updateOne(
      { email: existemail?.email },
      { $set: { status: "logout" } },
      { new: true }
    );
    return res.send({
      statuscode: 200,
      message: "You are Logout Successfully!!",
    });
  } else {
    return res.send({
      statuscode: 400,
      message: "Somting wrong !!",
    });
  }
};
module.exports = { userSignup, userLogin, UserLogout };
