const express = require('express');
const router = express.Router();
const { VerifyToken } = require("./../middlewares/token");
const { RevokeUser } = require("./../classes/User");
require('dotenv').config();
/**
 * @swagger
 * tags:
 *   - name: Revoke users
 *     description: Revoke user certificates
 */
/**
 * @swagger
 * 
 * /revokeuser:
 *   post:
 *     tags: [Revoke users]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Access token, that in .env
 *       - in: query
 *         name: user
 *         required: true
 *         schema:
 *           type: string
 *         description: Username for who we want revoke certificate
 *     summary: Revoke user certificates. After that you can't use uthis certificate for connect and it can't be restored
 *     responses:
 *       200:
 *         description: User succesfully revoked
 */
router.post('/revokeuser', VerifyToken, async (req, res) => {
    const userName = req.query.user;
    const status = await RevokeUser(userName);

    if(status != false) res.status(200).json({ message: "User revoked" });
    else res.status(500).json({ message: "Error revoking user" });
});

module.exports = router;