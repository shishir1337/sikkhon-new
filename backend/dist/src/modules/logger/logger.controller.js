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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerController = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("../../shared/decorators/public.decorator");
const log_service_1 = require("./log.service");
const is_instructor_decorator_1 = require("../../shared/decorators/is-instructor.decorator");
let LoggerController = class LoggerController {
    constructor(logService) {
        this.logService = logService;
    }
    getLogFilesName() {
        return this.logService.getLogFilesName();
    }
    getDetailsOfLogg(payload) {
        return this.logService.getLogFromAllFiles(payload);
    }
    deleteLoggFiles(payload) {
        return this.logService.deleteLoggFiles(payload);
    }
};
__decorate([
    (0, common_1.Get)('get-log-file-names'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LoggerController.prototype, "getLogFilesName", null);
__decorate([
    (0, common_1.Get)('details'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LoggerController.prototype, "getDetailsOfLogg", null);
__decorate([
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LoggerController.prototype, "deleteLoggFiles", null);
LoggerController = __decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Controller)('logger'),
    __metadata("design:paramtypes", [log_service_1.LogService])
], LoggerController);
exports.LoggerController = LoggerController;
//# sourceMappingURL=logger.controller.js.map