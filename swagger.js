import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'InfraCow API',
      version: '1.0.0',
      description: 'API para gerenciamento de fazendas, animais e medições de temperatura',
      contact: {
        name: 'InfraCow Team',
      },
    },
    servers: [
      {
        url: 'https://infracow-api-hv24.onrender.com',
        description: 'Production Server',
      },
      {
        url: 'http://localhost:3000',
        description: 'Development Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

export default swaggerJsdoc(options);
