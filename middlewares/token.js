require('dotenv').config();

const API_TOKKEN = process.env.API_SECRET;

// Middleware to verify token from query parameter
const VerifyToken = (req, res, next) => {
    const token = req.query.token;
    if (!token) return res.status(401).send('Access denied. Token is required.');
  
      if(token == API_TOKKEN) next();
      else res.status(400).send('Invalid token.');
};

module.exports = {VerifyToken};