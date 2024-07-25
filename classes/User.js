const { AddNewUser } = require('./VPN');
require('dotenv').config();
const DB = require('./Database');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const rootFileSertificatesDirectory = process.env.CERTIFITES_DIRECTORY;
const isDev = process.env.DEV == "true" ? true : false;

const fileDirectories = {
    common_certificate: path.join(__dirname, "./../certificates/common"),
    ios: path.join(__dirname,  "./../certificates/ios"),
    strongswan: path.join(__dirname, "./../certificates/strongswan")
}

const USER_TYPES = {
    ikev2: "ikev2"
}

// Add new vpn user
async function AddNewIkev2User() {
    const userName = crypto.randomUUID().replace('-', '');
    const iosPath = path.join(fileDirectories.ios, `${userName}.mobileconfig`);
    const strongswanPath = path.join(fileDirectories.strongswan, `${userName}.sswan`);
    const commonPath = path.join(fileDirectories.common_certificate, `${userName}.p12`);

    // Creating new user certificate
    if (!isDev) {
        const creatingResult = await AddNewUser(userName);
        if (!creatingResult) return false;
    }

    // Transfer userkeys if not in dev
    if (!isDev) {
        ensureDirectoryExistence(fileDirectories.common_certificate);
        ensureDirectoryExistence(fileDirectories.ios);
        ensureDirectoryExistence(fileDirectories.strongswan);

        moveFile(rootFileSertificatesDirectory + `/${userName}.mobileconfig`, iosPath);
        moveFile(rootFileSertificatesDirectory + `/${userName}.sswan`, strongswanPath);
        moveFile(rootFileSertificatesDirectory + `/${userName}.p12`, commonPath);
    }
    // Make fake configs if in dev
    else{
        await fs.writeFileSync(iosPath, "test");
        await fs.writeFileSync(strongswanPath, "test");
        await fs.writeFileSync(commonPath, "test");
    }

    // Save user to database 
    await DB.AddUser(userName, "./", "-", USER_TYPES.ikev2);
    return {name: userName}
}

const ensureDirectoryExistence = (filePath) => {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
};

// Function to move the file
const moveFile = (source, destination) => {
    fs.rename(source, destination, (err) => {
        if (err) {
            console.error('Error moving file:', err);
        } else {
            console.log('File moved successfully!');
        }
    });
};

module.exports = { AddNewIkev2User, fileDirectories };