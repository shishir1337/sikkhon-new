"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./user/users.service");
const users_controller_1 = require("./user/users.controller");
const user_verify_code_service_1 = require("../verification_code/user-verify-code.service");
const prisma_module_1 = require("../prisma/prisma.module");
const admin_controller_1 = require("./admin/admin.controller");
const admin_service_1 = require("./admin/admin.service");
const mailer_service_1 = require("../../shared/mail/mailer.service");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        controllers: [users_controller_1.UserController, admin_controller_1.AdminController],
        providers: [users_service_1.UsersService, user_verify_code_service_1.UserVerificationCodeService, admin_service_1.AdminService, mailer_service_1.MailerService],
        imports: [prisma_module_1.PrismaModule],
        exports: [users_service_1.UsersService, admin_service_1.AdminService],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map