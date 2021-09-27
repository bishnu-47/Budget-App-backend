import User from "../models/User.js";
import ErrorResponse from "../utils/ErrorResponse.js";

// @desc   register new user
// @route   POST /api/auth/register
// @access   Public
export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    sendToken(user, 201, res);
  } catch (err) {
    return next(err);
  }
};

// @desc   login for user
// @route   POST /api/auth/login
// @access   Public
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse("Please enter email and password", 400));
  }

  try {
    const user = await User.findOne({ email }).select("password");

    // if no user found in DB
    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // if password is invalid
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // if everything is correct
    sendToken(user, 200, res);
  } catch (err) {
    return next(err);
  }
};

// @desc   forgot password route
// @route   POST /api/auth/forgotpassword
// @access   Public
export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(new ErrorResponse("Please provide an email", 400));

  try {
    const user = await User.findOne({ email });
    if (!user) return next(new ErrorResponse("Email could not be sent", 400));

    // get reset token and save it to DB
    const resetToken = user.getResetPasswordToken();
    await user.save();

    // create message and url where client reset the password
    let resetUrl;
    if (process.env.NODE_ENV === "development")
      resetUrl = `http://localhost:3000/api/resetpassword/${resetToken}`;
    else resetUrl = `/api/resetpassword/${resetToken}`;
    let message = `
      <h2>You have requested to reset your password</h2>
      <p>Follow the link below:</p>
      <a href=${resetUrl}>${resetUrl}</a>
    `;

    // send email
  } catch (e) {}
};
// @desc   reset password route
// @route   PUT /api/auth/resetpassword/:resetToken
// @access   Public
export const resetPassword = (req, res, next) => {
  res.send("reset password route " + req.params.resetToken);
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({
    success: true,
    token,
  });
};
