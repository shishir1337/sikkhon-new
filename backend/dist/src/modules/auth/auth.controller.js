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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const signup_credentials_dto_1 = require("./dto/signup-credentials.dto");
const login_credentials_dto_1 = require("./dto/login-credentials.dto");
const refresh_token_dto_1 = require("./dto/refresh-token.dto");
const logout_dto_1 = require("./dto/logout.dto");
const forgot_credentials_dto_1 = require("./dto/forgot-credentials.dto");
const public_decorator_1 = require("../../shared/decorators/public.decorator");
const verify_email_credentials_dto_1 = require("./dto/verify-email-credentials.dto");
const reset_password_dto_1 = require("./dto/reset-password.dto");
const googleCred_dto_1 = require("./dto/googleCred.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    signup(payload) {
        return this.authService.signup(payload);
    }
    forgotPassword(payload) {
        return this.authService.forgotEmail(payload);
    }
    resetPassword(payload) {
        return this.authService.resetPassword(payload);
    }
    verifyEmail(payload) {
        return this.authService.verifyEmail(payload);
    }
    async adminLogin(payload, request) {
        const browserInfo = `${request.ip} ${request.headers['user-agent']} ${request.headers['accept-language']}`.replace(/ undefined/g, '');
        return this.authService.adminLogin(payload, browserInfo);
    }
    async studentOrInstructorLogin(payload, request) {
        const browserInfo = `${request.ip} ${request.headers['user-agent']} ${request.headers['accept-language']}`.replace(/ undefined/g, '');
        return this.authService.studentOrInstructorLogin(payload, browserInfo);
    }
    async refreshToken({ refreshToken }, request) {
        const browserInfo = `${request.ip} ${request.headers['user-agent']} ${request.headers['accept-language']}`.replace(/ undefined/g, '');
        return this.authService.refreshToken(refreshToken, browserInfo);
    }
    async logout({ refreshToken }) {
        return this.authService.logout(refreshToken);
    }
    async googleLogin(request, googleCred) {
        const browserInfo = `${request.ip} ${request.headers['user-agent']} ${request.headers['accept-language']}`.replace(/ undefined/g, '');
        return this.authService.googleLogin(request, googleCred, browserInfo);
    }
    async logoutAll(request) {
        const { userId } = request.body.user;
        return this.authService.logoutAll(userId);
    }
    async findAllTokens(request) {
        const { userId } = request.body.user;
        return this.authService.findAllTokens(userId);
    }
    githubLogin(payload) {
        return this.authService.githubLogin(payload);
    }
};
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_credentials_dto_1.SignupCredentialsDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signup", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_credentials_dto_1.ForgotCredentialsDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordCredentialsDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('verify-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_email_credentials_dto_1.VerifyEmailCredentialsDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "verifyEmail", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('admin/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_credentials_dto_1.LoginCredentialsDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "adminLogin", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_credentials_dto_1.LoginCredentialsDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "studentOrInstructorLogin", null);
__decorate([
    (0, common_1.Post)('token-refresh'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_dto_1.RefreshTokenDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [logout_dto_1.LogoutDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('google-login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, googleCred_dto_1.GoogleSignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleLogin", null);
__decorate([
    (0, common_1.Post)('logoutAll'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logoutAll", null);
__decorate([
    (0, common_1.Get)('tokens'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "findAllTokens", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('github-login'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "githubLogin", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map