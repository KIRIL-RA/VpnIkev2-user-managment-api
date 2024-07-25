const express = require('express');
const router = express.Router();
const {VerifyToken} = require("./../middlewares/token");
const {AddNewIkev2User} = require("./../classes/User");
require('dotenv').config();

// POST /credentials
router.post('/addnewuser', VerifyToken, async (req, res) => {
    const userName = await AddNewIkev2User();
    res.status(200).json({ userName: userName.name });
});

module.exports = router;
