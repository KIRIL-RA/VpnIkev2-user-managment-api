const swaggerJsDoc = require('swagger-jsdoc');
require('dotenv').config();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'IkeV2 server documentation',
      version: '1.0.0',
      description: 'IkeV2 server information',
    },
    servers: [
      {
        url: `http://${process.env.HOSTNAME}:${process.env.PORT}`,
      },
    ],
  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;