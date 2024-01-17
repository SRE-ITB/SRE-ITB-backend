"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiKeyMiddleware = void 0;
const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers["x-api-key"];
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
};
exports.apiKeyMiddleware = apiKeyMiddleware;
