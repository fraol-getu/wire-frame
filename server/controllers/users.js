const redis = require('redis');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const session = require("express-session");
// Create Redis client
const redisClient = redis.createClient();
 /**
 * @openapi
 * /api/v1/users/registerUser:
 *   post:
 *     tags:
 *      - "users"
 *     description: Get your authentication header token here 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "abebe"
 *               
 *               password:
 *                 type: string
 *                 example: "pass@123"
 *               password_confirmation:
 *                 type: string
 *                 example: "pass@123"
 *
 *     responses:
 *       200:
 *         description: token found
 *       400:
 *         description: request error
 */
const registerUser = async (req, res) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
      role: req.body.role || 'user' // Default role is 'user' if not specified
    });

    // Save the user to the database
    await newUser.save();

    // Store hashed password in Redis
    redisClient.set(req.body.username, hashedPassword);

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


 /**
 * @openapi
 * /api/v1/users/loginUser:
 *   post:
 *     tags:
 *      - "users"
 *     description: Login to user account and get token 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "abebe21"
 *               password:
 *                 type: string
 *                 example: "pass@123"
 *
 *     responses:
 *       200:
 *         description: token found
 *       400:
 *         description: request error
 */
const loginUser = async (req, res) => {
  try {
    
    var expireTime = new Date(req.session.cookie.expires) - new Date();
    // Check if user exists
    const user = await User.findOne({ username: req.body.username,sessionExpireTime:expireTime });
    
    if (!user) {
      throw new Error("User not found");
    }

    // Compare password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      throw new Error("Invalid password");
    }

    // Generate session ID
    const sessionUser = {req.body};
    req.session.User=sessionUser;

    // Store session data in Redis
    redisClient.set(sessionUser, user._id.toString(), "EX", 24 * 60 * 60); // Session expires in 1 day

    // Send response
    res.send({
      success: true,
      message: "User logged in successfully",
      sessionId: sessionId,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

// Controller function to get the current user
/**
 * @openapi
 * /api/v1/users/getCurrentUser:
 *   get:
 *     tags:
 *       - "users"
 *     description: Get the current user
 *     responses:
 *       200:
 *         description: User fetched successfully
 *       400:
 *         description: Request error
 */
const getCurrentUser = async (req, res) => {
  try {
    //const user = req.session.user;
    // Use the userId from the request object to fetch the current user profile
    const user = await User.findById(req.userId);
    if (!user) {
      throw new Error("User not authenticated");
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @openapi
 * /api/v1/users/getAllUsers:
 *   get:
 *     tags:
 *       - "users"
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *       400:
 *         description: Request error
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { registerUser, loginUser, getCurrentUser, getAllUsers };