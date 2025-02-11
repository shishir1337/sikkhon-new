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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCertificateController = void 0;
const common_1 = require("@nestjs/common");
const certificate_service_1 = require("../certificate.service");
const user_decorators_1 = require("../../../shared/decorators/user.decorators");
const client_1 = require("@prisma/client");
let UserCertificateController = class UserCertificateController {
    constructor(certificateService) {
        this.certificateService = certificateService;
    }
    async generateCertificate(user, course_id) {
        return this.certificateService.generateCertificate(user, course_id);
    }
};
__decorate([
    (0, common_1.Get)('generate-certificate-:course_id'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Param)('course_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _a : Object, Number]),
    __metadata("design:returntype", Promise)
], UserCertificateController.prototype, "generateCertificate", null);
UserCertificateController = __decorate([
    (0, common_1.Controller)('certificate'),
    __metadata("design:paramtypes", [certificate_service_1.CertificateService])
], UserCertificateController);
exports.UserCertificateController = UserCertificateController;
//# sourceMappingURL=user-certificate.controller.js.map