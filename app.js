const express = require('express');
const DB = require('./classes/Database');
require('dotenv').config();

const bodyParser = require('body-parser');
const credentialsRoute = require('./routes/addUser');
const getIosSecrets = require('./routes/getSecretFilesIos');
const getCommonSecrets = require('./routes/getSecretFilesCommon');
const getStrongswanSecrets = require('./routes/getSecretFielsStrongswan');

DB.Connect();

const app = express();
const PORT = process.env.PORT; // Choose any port you prefer

// Middleware to parse application/json
app.use(bodyParser.json());

// Mounting the credentials route handler
app.use(credentialsRoute);
app.use(getIosSecrets);
app.use(getCommonSecrets);
app.use(getStrongswanSecrets);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

