"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateModule = void 0;
const common_1 = require("@nestjs/common");
const user_certificate_controller_1 = require("./user/user-certificate.controller");
const certificate_service_1 = require("./certificate.service");
let CertificateModule = class CertificateModule {
};
CertificateModule = __decorate([
    (0, common_1.Module)({
        controllers: [user_certificate_controller_1.UserCertificateController],
        providers: [certificate_service_1.CertificateService],
    })
], CertificateModule);
exports.CertificateModule = CertificateModule;
//# sourceMappingURL=certificate.module.js.map