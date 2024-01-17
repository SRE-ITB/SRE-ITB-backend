"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_1 = __importDefault(require("./swagger"));
const activity_routes_1 = require("./activity/activity.routes");
const documentation_routes_1 = require("./documentation/documentation.routes");
const apiKeyMiddleware_1 = require("./middlewares/apiKeyMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT, 10) || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.static("static"));
app.use(express_1.default.json());
app.use("/api/activity", apiKeyMiddleware_1.apiKeyMiddleware, activity_routes_1.activityRoutes);
app.use("/api/documentation", apiKeyMiddleware_1.apiKeyMiddleware, documentation_routes_1.documentationRoutes);
app.use("/doc", swagger_1.default);
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running on port ${PORT}`);
});
