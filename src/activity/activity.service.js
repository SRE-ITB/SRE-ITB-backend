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
exports.deleteActivity = exports.updateActivity = exports.createActivity = exports.getActivityByType = exports.getActivityById = exports.getAllActivities = void 0;
const db_server_1 = require("../utils/db.server");
const getAllActivities = (sort, limit) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.db.activity.findMany({
        orderBy: sort ? { date: sort === "asc" ? "asc" : "desc" } : undefined,
        take: limit
    });
});
exports.getAllActivities = getAllActivities;
const getActivityById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.db.activity.findUnique({
        where: {
            id
        }
    });
});
exports.getActivityById = getActivityById;
const getActivityByType = (type, sort, limit) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.db.activity.findMany({
        where: {
            type
        },
        orderBy: sort ? { date: sort === "asc" ? "asc" : "desc" } : undefined,
        take: limit
    });
});
exports.getActivityByType = getActivityByType;
const createActivity = (activity) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.db.activity.create({
        data: activity
    });
});
exports.createActivity = createActivity;
const updateActivity = (id, activity) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.db.activity.update({
        where: {
            id
        },
        data: activity
    });
});
exports.updateActivity = updateActivity;
const deleteActivity = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.db.activity.delete({
        where: {
            id
        }
    });
});
exports.deleteActivity = deleteActivity;
