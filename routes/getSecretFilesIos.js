const express = require('express');
const router = express.Router();
const {VerifyToken} = require("../middlewares/token");
const {fileDirectories} = require("./../classes/User");
const fs = require('fs');
const path = require('path');

// Serve static files with token verification
router.get(`/ios/:filename`, VerifyToken, (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(fileDirectories.ios, `${filename}.mobileconfig`);
  
    // Check if file exists
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).send('File not found.');
    }
  });

  module.exports = router;