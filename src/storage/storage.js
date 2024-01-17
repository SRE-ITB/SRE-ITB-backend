"use strict";
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
exports.uploadFile = void 0;
const path_1 = __importDefault(require("path"));
const googleapis_1 = require("googleapis");
const stream_1 = __importDefault(require("stream"));
const KEYFILEPATH = path_1.default.join(__dirname, "../storage/cred.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];
const auth = new googleapis_1.google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES
});
const uploadFile = (fileObject) => __awaiter(void 0, void 0, void 0, function* () {
    const bufferStream = new stream_1.default.PassThrough();
    bufferStream.end(fileObject.buffer);
    try {
        const drive = googleapis_1.google.drive({ version: "v3", auth });
        const { data } = yield drive.files.create({
            media: {
                mimeType: fileObject.mimeType,
                body: bufferStream
            },
            requestBody: {
                name: fileObject.originalname,
                parents: ["1rDnwcbfPJSk_nD2jJ_m7oG3A0EXorNfL"]
            },
            fields: "id,name,webViewLink"
        });
        const fileId = data.id;
        const embeddedPreviewUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
        console.log("File uploaded to Google Drive:", embeddedPreviewUrl);
        return embeddedPreviewUrl;
    }
    catch (error) {
        console.error("Error uploading file to Google Drive:", error.message);
        throw error;
    }
});
exports.uploadFile = uploadFile;
