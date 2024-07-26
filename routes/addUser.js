const express = require('express');
const router = express.Router();
const { VerifyToken } = require("./../middlewares/token");
const { AddNewIkev2User } = require("./../classes/User");
require('dotenv').config();

/**
 * @swagger
 * tags:
 *   - name: Adding users
 *     description: Adding new vpn users
 */
/**
 * @swagger
 * 
 * /addnewuser:
 *   post:
 *     tags: [Adding users]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Access token, that in .env
 *     summary: Adding new vpn user. You i'll recieve username, that you need save it. It will be used for getting user sertificates.
 *     responses:
 *       200:
 *         description: User succesfully added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Added username
 */
router.post('/addnewuser', VerifyToken, async (req, res) => {
    const userName = await AddNewIkev2User();
    if(userName != false) res.status(200).json({ userName: userName.name });
    else res.status(500).json({ message: "Error adding new user" });
});

module.exports = router;
