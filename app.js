const express = require('express');
const DB = require('./classes/Database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./classes/SwaggerConfig');
require('dotenv').config();

// Check is we in dev mode
const isDev = process.env.DEV == "true" ? true : false;

// Require needed files
const bodyParser = require('body-parser');
const credentialsRoute = require('./routes/addUser');
const health = require('./routes/health');
const getIosSecrets = require('./routes/getSecretFilesIos');
const getCommonSecrets = require('./routes/getSecretFilesCommon');
const getStrongswanSecrets = require('./routes/getSecretFielsStrongswan');
const revokeUser = require('./routes/revokeUser');

// Database
DB.Connect();

// Server configs
const app = express();
const PORT = process.env.PORT; // Choose any port you prefer

// Middleware to parse application/json
app.use(bodyParser.json());

// Mounting the route handlers
app.use(credentialsRoute);
app.use(getIosSecrets);
app.use(getCommonSecrets);
app.use(getStrongswanSecrets);
app.use(revokeUser);
app.use(health);

if(isDev) app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

