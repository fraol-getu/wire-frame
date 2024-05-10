const redis = require('redis');
const redisClient = redis.createClient();

module.exports = (req, res, next) => {
  try {
    // Get session ID from request headers
    const sessionId = req.header('authorization').split(' ')[1];

    // Retrieve session data from Redis
    redisClient.get(sessionId, (err, sessionData) => {
      if (err) {
        throw new Error('Failed to retrieve session data from Redis');
      }

      // Parse session data
      const session = JSON.parse(sessionData);

      // Check if user has super admin role
      if (session) {
        // Extract user ID from session data
        req.body.userId = session.userId;

        next();
      } else {
        // If user doesn't have super admin role, deny access
        res.status(403).json({
          success: false,
          message: 'Forbidden: Only super admins are allowed to access this resource',
        });
      }
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
