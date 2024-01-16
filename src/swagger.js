"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const express_1 = require("express");
const router = (0, express_1.Router)();
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
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
// Rute untuk endpoint dokumentasi swagger
router.use('/', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
exports.default = router;
