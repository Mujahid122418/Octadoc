const crypto = require("crypto");
const asyncHandler = require("../middleware/async");

const sendEmail = require("../utils/sendEmail");
const User = require("../models/user");

exports.register = asyncHandler(async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      role,
      gender,
      state,
      language,
      countryofTraining,
      workingHours,
      yearsofPractice,
      phone,
    } = req.body;

    //  Create user
    let isAlready = await User.findOne({ email: email });

    if (isAlready) {
      return res.status(500).send({
        success: false,
        message: `${email} Email is Already exist`,
        // message: error,
      });
    } else {
      const user = await User.create({
        name,
        email,
        password,
        role,
        gender,
        state,
        language,
        countryofTraining,
        workingHours,
        yearsofPractice,
        phone,
      });
      sendTokenResponse(user, 200, res);
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong or Not authorized to access this route",
      // message: error,
    });
  }
});

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate emil & password
  if (!email || !password) {
    res
      .status(401)
      .send({ success: false, message: "Not authorized to access this route" });
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    res.status(401).send({ success: false, message: "Invalid credentials" });
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    res.status(401).send({ success: false, message: "Invalid credentials" });
  }

  sendTokenResponse(user, 200, res);
});

// @desc      Get current logged in user
// @route     POST /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const { id } = req?.body;
  const user = await User.findById(id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Forgot password
// @route     POST /api/v1/auth/forgotpassword
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res
      .status(404)
      .send({ success: false, message: "There is no user with that email" });
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/auth/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: "mujahid122418@gmail.com",
      subject: "Password reset token",
      message,
    });

    res.status(200).json({ success: true, data: "Email sent" });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    res
      .status(500)
      .send({ success: false, message: "Email could not be sent" });
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Reset password
// @route     PUT /api/v1/auth/resetpassword/:resettoken
// @access    Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400).send({ success: false, message: "Invalid token" });
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const { id, name, email } = req.body;
  const fieldsToUpdate = {
    name: name,
    email: email,
  };

  const user = await User.findByIdAndUpdate(id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const { id, newPassword, currentPassword } = req.body;
  // const user1 = await User.findById({ _id: id });

  const user = await User.findById(id).select("+password");

  // Check current password
  if (!(await user.matchPassword(currentPassword))) {
    res.status(401).send({ success: false, message: "Password is incorrect" });
  }
  user.password = newPassword;
  await user.save();
  sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};
// module.exports = router;
