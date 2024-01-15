import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import { Router } from 'express';

const router = Router();

// Konfigurasi swagger
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Activity API',
      version: '1.0.0',
      description: 'Documentation for Activity API',
    },
  },
  apis: [
    './src/activity/*.swagger.ts',
    './src/documentation/*.swagger.ts'
  ],
};

const swaggerSpec = swaggerJSDoc(options);

// Rute untuk endpoint dokumentasi swagger
router.use('/', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec));

export default router;
