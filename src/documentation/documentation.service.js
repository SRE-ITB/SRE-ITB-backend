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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentationByActivityId = exports.createDocumentation = void 0;
const db_server_1 = require("../utils/db.server");
const createDocumentation = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.db.documentation.create({
        data: data
    });
});
exports.createDocumentation = createDocumentation;
const getDocumentationByActivityId = (activityId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.db.documentation.findMany({
        where: {
            activityId
        }
    });
});
exports.getDocumentationByActivityId = getDocumentationByActivityId;
