const User = require("../models/User");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = new User({
      name,
      email,
      password,
    });

    const savedUser = await user.save();
    console.log("User saved to database:", savedUser);

    // Send a success response with an alert message
    const responseData = {
      token: "",
      user: savedUser,
      message: "User saved successfully",
    };
    try {
      const secretKey = "mySecretKey";

      const token = jwt.sign({ id: savedUser._id }, secretKey, {
        expiresIn: "1hr",
      });

      responseData.token = token;
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error signing JWT token" });
      return;
    }
    res.status(201).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error registering user" });
  }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user in the database by email
      const user = await User.findOne({ email });
  
      if (!user) {
        console.log("User not found");
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      console.log("User found:", user);
  
      // Check if the entered password matches the database password
      if (password !== user.password) {
        console.log("Incorrect password");
        return res.status(401).json({ error: "Invalid credentials - password incorrect" });
      }
  
      // Generate a JWT token for the user
      const secretKey = "mySecretKey";
      const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "1hr" });
  
      // Return the token and user data in the response
      res.status(200).json({ token, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error finding user" });
    }
  };
  
  const updateUserPassword = async (req, res) => {
    const { email, currentPassword, newPassword } = req.body;
  
    try {
      const updatedUser = await User.findOneAndUpdate(
        { email: email, password: currentPassword },
        { password: newPassword },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found or current password is incorrect" });
      }
  
      console.log("User password updated:", updatedUser);
  
      // Send a success response with an alert message
      const responseData = {
        message: "Password updated successfully",
      };
      res.status(200).json(responseData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error updating password" });
    }
  };
  
  
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const adminEmail = "admin@example.com";
  const adminPassword = "adminpassword";

  if (email === adminEmail && password === adminPassword) {
    const secretKey = "mySecretKey";
    const token = jwt.sign({ isAdmin: true }, secretKey);

    res.status(200).json({ message: "Admin login successful", token });
  } else {
    res.status(401).json({ error: "Invalid admin credentials" });
  }
};

const getUser = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error finding user" });
    }
  };
  
  module.exports = {
    registerUser,
    loginUser,
    loginAdmin,
    updateUserPassword,
    getUser,
  };