const asyncHandler = require("express-async-handler");
const userModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.send(400);
    throw new Error("All fields are Mandatory");
  }
  //find user by using email
  const userAvailable = await userModel.findOne({ email });
  if (userAvailable) {
    res.send(400);
    throw new Error("User Already Registered");
  }
  //hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashed password :", hashedPassword);
  //create user
  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Users Data is not valid");
  }
  res.json({ message: "User Registered" });
});

//@desc Login a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are Mandatory");
  }

  const user = await userModel.findOne({ email });
  //compare password with hashpassword
  //this is the heart of login authentication
  if (user && ( await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign({
        user:{
            username:user.username,
            email: user.email,
            id:user.id
        }
    },
process.env.ACCESS_TOKEN_SECRET,
{expiresIn :"5m"}
);
return res.status(200).json({ accessToken });
}
res.status(401);
throw new Error("Email or Password is not Valid")
});

//@desc user Info
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
