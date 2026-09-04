const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// =========================================
// GENERATE JWT TOKEN
// =========================================

const generateToken = (id, role) => {
  return jwt.sign(
    {
      id,
      role,
    },
    process.env.JWT_SECRET || "medicalmarketplace",
    {
      expiresIn: "7d",
    }
  );
};

// =========================================
// REGISTER USER
// =========================================

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const userExists = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: "user",
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
};

// =========================================
// LOGIN USER
// =========================================

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (user && (await user.matchPassword(password))) {
      return res.status(200).json({
        success: true,
        message: "Login successful",
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid Email or Password",
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};

// =========================================
// FORGOT PASSWORD
// POST /api/auth/forgot-password
// =========================================

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please enter your email",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    // Do not reveal whether the email exists
    if (!user) {
      return res.status(200).json({
        success: true,
        message:
          "If this email is registered, a password reset link has been generated.",
      });
    }

    // Generate random reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash token before storing in database
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;

    // Token expires after 15 minutes
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    // Development reset URL
    const resetUrl =
      `http://localhost:5173/reset-password/${resetToken}`;

    console.log("=================================");
    console.log("PASSWORD RESET REQUEST");
    console.log("Email:", user.email);
    console.log("Reset URL:", resetUrl);
    console.log("Expires in: 15 minutes");
    console.log("=================================");

    res.status(200).json({
      success: true,
      message:
        "Password reset link generated successfully.",
      resetUrl,
    });
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Unable to process password reset request",
    });
  }
};

// =========================================
// RESET PASSWORD
// POST /api/auth/reset-password/:token
// =========================================

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Reset token is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please enter a new password",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Hash received token
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    // Update password
    user.password = password;

    // Remove reset token
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Password reset successful. You can now login.",
    });
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Password reset failed",
    });
  }
};

// =========================================
// EXPORT
// =========================================

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
};
