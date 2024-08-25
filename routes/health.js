const express = require('express');
const router = express.Router();
const { VerifyToken } = require("../middlewares/token");
require('dotenv').config();

/**
 * @swagger
 * tags:
 *   - name: Status
 *     description: Server status
 */
/**
 * @swagger
 * 
 * /health:
 *   get:
 *     tags: [Status]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Access token, that in .env
 *     summary: Get server status
 *     responses:
 *       200:
 *         description: User succesfully added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: server status
 */
router.get('/health', VerifyToken, async (req, res) => {
    if(userName != false) res.status(200).json({ status: 'ok' });
    else res.status(500).json({ message: "Somthing went wrong" });
});

module.exports = router;