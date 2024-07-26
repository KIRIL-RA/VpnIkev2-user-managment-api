const express = require('express');
const router = express.Router();
const {VerifyToken} = require("../middlewares/token");
const {fileDirectories} = require("./../classes/User");
const fs = require('fs');
const path = require('path');

/**
 * @swagger
 * 
 * /common/:username.p12:
 *   get:
 *     tags: [Getting user certificates]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Access token, that in .env
 *     summary: Getting common sertificate for connect via os core functions app. Insert instead :username username of user fow who you need sertificate.
 *     responses:
 *       200:
 *         description: Common config file
 *         content:
 *            application/file:
 *             schema:
 *               type: Common config file
 *               format: binary
 */
router.get(`/common/:filename.p12`, VerifyToken, (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(fileDirectories.common_certificate, `${filename}`);
  
    // Check if file exists
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).send('File not found.');
    }
  });

  module.exports = router;