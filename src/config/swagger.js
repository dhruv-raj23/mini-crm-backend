const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mini CRM Backend API',
      version: '1.0.0',
      description: 'Backend API for Users, Customers and Tasks'
    },
    servers: [
      { url: 'http://localhost:5000' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./src/modules/**/*.js']
};

module.exports = swaggerJsdoc(options);
