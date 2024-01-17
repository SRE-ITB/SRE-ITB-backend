"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activityRoutes = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const activityService = __importStar(require("./activity.service"));
const client_1 = require("@prisma/client");
const storage_1 = require("../storage/storage");
exports.activityRoutes = express_1.default.Router();
const upload = (0, multer_1.default)();
// GET: List of all activities
exports.activityRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sorting = req.query.sort;
        const limit = Number(req.query.limit) || 100;
        const activities = yield activityService.getAllActivities(sorting, limit);
        res.status(200).json({
            message: "Success",
            data: activities
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error",
            data: null
        });
    }
}));
// GET: Latest activities for each type
exports.activityRoutes.get("/latest", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activities = yield Promise.all(Object.values(client_1.ActivityType).map((type) => __awaiter(void 0, void 0, void 0, function* () {
            const activity = yield activityService.getActivityByType(type, "desc", 1);
            return activity[0];
        })));
        res.status(200).json({
            message: "Success",
            data: activities.filter((activity) => activity)
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error",
            data: null
        });
    }
}));
// GET: Activity by id
exports.activityRoutes.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activity = yield activityService.getActivityById(Number(req.params.id));
        if (activity) {
            res.status(200).json({
                message: "Success",
                data: activity
            });
        }
        else {
            res.status(404).json({
                message: "Activity not found",
                data: null
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Error",
            data: null
        });
    }
}));
// GET: Activities by type, type is enum: internal, external, learning, project
exports.activityRoutes.get("/type/:type", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestedType = req.params.type;
        if (!Object.values(client_1.ActivityType).includes(requestedType)) {
            return res.status(400).json({
                message: "Activity type must be either: internal, external, learning, project",
                data: null
            });
        }
        const sorting = req.query.sort;
        const limit = Number(req.query.limit) || 100;
        const activities = yield activityService.getActivityByType(requestedType, sorting, limit);
        res.status(200).json({
            message: "Success",
            data: activities
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error",
            data: null
        });
    }
}));
// POST: Create a new activity
exports.activityRoutes.post("/", upload.any(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body, files } = req;
        if (!Object.values(client_1.ActivityType).includes(body.type)) {
            return res.status(400).json({
                message: "Activity type must be either: internal, external, learning, project",
                data: null
            });
        }
        if (!files) {
            return res.status(400).json({
                message: "No thumbnail uploaded",
                data: null
            });
        }
        const uploadedFiles = yield Promise.all(files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            const uploadedFile = yield (0, storage_1.uploadFile)(file);
            return uploadedFile;
        })));
        body.date = new Date(body.date);
        const activity = yield activityService.createActivity(Object.assign(Object.assign({}, body), { thumbnail: uploadedFiles[0] }));
        res.status(200).json({
            message: "Success",
            data: activity
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error",
            data: null
        });
    }
}));
// PATCH: Update an existing activity
exports.activityRoutes.patch("/:id", upload.any(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body, files } = req;
        if (!Object.values(client_1.ActivityType).includes(req.body.type)) {
            return res.status(400).json({
                message: "Activity type must be either: internal, external, learning, project",
                data: null
            });
        }
        if (files) {
            const uploadedFiles = yield Promise.all(files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
                const uploadedFile = yield (0, storage_1.uploadFile)(file);
                return uploadedFile;
            })));
            body.thumbnail = uploadedFiles[0];
        }
        body.date = new Date(body.date);
        console.log(body);
        const activity = yield activityService.updateActivity(Number(req.params.id), body);
        if (activity) {
            res.status(200).json({
                message: "Success",
                data: activity
            });
        }
        else {
            res.status(404).json({
                message: "Activity not found",
                data: null
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Error",
            data: null
        });
    }
}));
// DELETE: Delete an existing activity
exports.activityRoutes.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activity = yield activityService.deleteActivity(Number(req.params.id));
        if (activity) {
            res.status(200).json({
                message: "Success",
                data: activity
            });
        }
        else {
            res.status(404).json({
                message: "Activity not found",
                data: null
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Error",
            data: null
        });
    }
}));
