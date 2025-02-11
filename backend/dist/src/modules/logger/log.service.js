"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
const coreConstant_1 = require("../../shared/helpers/coreConstant");
const functions_1 = require("../../shared/helpers/functions");
let LogService = class LogService {
    constructor() {
        this.logDirectory = coreConstant_1.coreConstant.FILE_DESTINATION + '/logs/';
    }
    async getLogFilesName() {
        try {
            const logFiles = (0, fs_1.readdirSync)(this.logDirectory);
            if (!logFiles.length) {
                return (0, functions_1.errorResponse)('No log files found');
            }
            return (0, functions_1.successResponse)('Log files list', logFiles);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getLogFromAllFiles(payload) {
        try {
            const logFiles = (0, fs_1.readdirSync)(this.logDirectory);
            if (!logFiles.length) {
                return (0, functions_1.errorResponse)('No log files found');
            }
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            const logData = payload.file_name
                ? await this.readAllLogFile(payload.file_name, payload.search)
                : await this.readAllLogFiles(logFiles, payload.search);
            const limitOffset = await (0, functions_1.formatLimitOffset)(payload);
            const total = logData.length;
            const startIndex = (limitOffset.offset - 1) * limitOffset.limit;
            const endIndex = startIndex + limitOffset.limit;
            const paginatedLogs = logData.slice(startIndex, endIndex);
            const data = {
                list: paginatedLogs,
                meta: await (0, functions_1.paginationMetaData)(logData, payload),
            };
            return (0, functions_1.successResponse)('All Log', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async readAllLogFiles(logFiles, search) {
        let allLogs = [];
        try {
            for (const logFile of logFiles) {
                const filePath = (0, path_1.join)(this.logDirectory, logFile);
                const logContent = (0, fs_1.readFileSync)(filePath, 'utf8');
                const searchPattern = search ? new RegExp(search, 'i') : undefined;
                const logs = logContent
                    .split('\n')
                    .filter((entry) => entry.trim() !== '')
                    .map((entry) => {
                    try {
                        return JSON.parse(entry);
                    }
                    catch (error) {
                        (0, functions_1.storeException)(`Error parsing log entry: ${entry}`);
                        return null;
                    }
                })
                    .filter((logObject) => logObject !== null)
                    .filter((logObject) => search ? searchPattern.test(logObject.message) : true)
                    .map((logObject) => {
                    logObject.timestamp = new Date(logObject.timestamp)
                        .toISOString()
                        .split('T')[0];
                    return logObject;
                });
                allLogs = allLogs.concat(logs);
            }
            return allLogs;
        }
        catch (error) {
            return allLogs;
        }
    }
    async readAllLogFile(logFile, search) {
        let allLogs = [];
        try {
            const filePath = (0, path_1.join)(this.logDirectory, logFile);
            if (!(0, fs_1.existsSync)(filePath)) {
                return allLogs;
            }
            const logContent = (0, fs_1.readFileSync)(filePath, 'utf8');
            const searchPattern = search ? new RegExp(search, 'i') : undefined;
            allLogs = logContent
                .split('\n')
                .filter((entry) => entry.trim() !== '')
                .map((entry) => {
                try {
                    return JSON.parse(entry);
                }
                catch (error) {
                    (0, functions_1.storeException)(`Error parsing log entry: ${entry}`);
                    return null;
                }
            })
                .filter((logObject) => logObject !== null)
                .filter((logObject) => search ? searchPattern.test(logObject.message) : true)
                .map((logObject) => {
                logObject.timestamp = new Date(logObject.timestamp)
                    .toISOString()
                    .split('T')[0];
                return logObject;
            });
            return allLogs;
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async deleteLoggFiles(payload) {
        try {
            const deleteResponse = payload.file_name
                ? await this.deleteLogFile(payload.file_name)
                : await this.deleteAllLogFiles();
            return deleteResponse;
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async deleteAllLogFiles() {
        try {
            const files = (0, fs_1.readdirSync)(this.logDirectory);
            files.forEach((file) => {
                const filePath = (0, path_1.join)(this.logDirectory, file);
                (0, fs_1.unlinkSync)(filePath);
            });
            return (0, functions_1.successResponse)('Files are deleted successfully!');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async deleteLogFile(file_name) {
        try {
            const filePath = (0, path_1.join)(this.logDirectory, file_name);
            if (!(0, fs_1.existsSync)(filePath)) {
                return (0, functions_1.errorResponse)('File does not exist!');
            }
            (0, fs_1.unlinkSync)(filePath);
            return (0, functions_1.successResponse)('File is deleted successfully!');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
};
LogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LogService);
exports.LogService = LogService;
//# sourceMappingURL=log.service.js.map