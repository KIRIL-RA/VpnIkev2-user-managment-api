const express = require('express');
const router = express.Router();
const { VerifyToken } = require("../middlewares/token");
const { fileDirectories } = require("./../classes/User");
const fs = require('fs');
const path = require('path');
/**
 * @swagger
 * tags:
 *   - name: Getting user certificates
 *     description: Getting user certificates for different platforms
 */
/**
 * @swagger
 * 
 * /strongswan/:username.sswan:
 *   get:
 *     tags: [Getting user certificates]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Access token, that in .env
 *     summary: Getting strongswan sertificate for connect via strongswan app. Insert instead :username username of user fow who you need sertificate.
 *     responses:
 *       200:
 *         description: Strogswan config file
 *         content:
 *            application/file:
 *             schema:
 *               type: Strogswan config file
 *               format: binary
 */
router.get(`/strongswan/:filename`, VerifyToken, (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(fileDirectories.strongswan, `${filename}`);

  // Check if file exists
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('File not found.');
  }
});

module.exports = router;