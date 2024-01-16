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
exports.documentationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const documentationService = __importStar(require("./documentation.service"));
const multer_1 = __importDefault(require("multer"));
const storage_1 = require("../storage/storage");
exports.documentationRoutes = express_1.default.Router();
const upload = (0, multer_1.default)();
// GET: Get a list of all documentation for an activity from multer
exports.documentationRoutes.get("/:activityId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activityId = Number(req.params.activityId);
        const documentation = yield documentationService.getDocumentationByActivityId(activityId);
        res.status(200).json({
            message: "Success",
            data: documentation
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            data: null
        });
    }
}));
// POST: Create documentation
exports.documentationRoutes.post("/:activityId", upload.any(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { files } = req;
        if (!files || files.length === 0) {
            res.status(400).json({
                message: "No files uploaded",
                data: null
            });
        }
        const activityId = Number(req.params.activityId);
        const documentationFiles = files;
        documentationFiles.forEach((file) => __awaiter(void 0, void 0, void 0, function* () {
            const uploadedFile = yield (0, storage_1.uploadFile)(file);
            yield documentationService.createDocumentation({
                title: file.originalname,
                url: uploadedFile,
                activityId
            });
        }));
        res.status(200).json({
            message: "Success",
            data: null
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            data: null
        });
    }
}));
