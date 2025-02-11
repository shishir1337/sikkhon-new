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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const invalid_email_or_password_exception_1 = require("./exceptions/invalid-email-or-password.exception.");
const invalid_refresh_token_exception_1 = require("./exceptions/invalid-refresh-token.exception");
const bcrypt_1 = require("bcrypt");
const uuid_1 = require("uuid");
const users_service_1 = require("../users/user/users.service");
const response_model_1 = require("../../shared/models/response.model");
const functions_1 = require("../../shared/helpers/functions");
const getAdminSettingsData_1 = require("../../shared/helpers/getAdminSettingsData");
const prisma_service_1 = require("../prisma/prisma.service");
const getTokenExpirationDate_1 = require("../../shared/utils/getTokenExpirationDate");
const jwt_config_1 = require("../../shared/configs/jwt.config");
const coreConstant_1 = require("../../shared/helpers/coreConstant");
const user_verify_code_service_1 = require("../verification_code/user-verify-code.service");
const google_auth_library_1 = require("google-auth-library");
const array_constants_1 = require("../../shared/constants/array.constants");
const axios_1 = __importDefault(require("axios"));
let AuthService = class AuthService {
    constructor(userService, prisma, jwtService, userVerificationCodeService) {
        this.userService = userService;
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.userVerificationCodeService = userVerificationCodeService;
    }
    async checkEmail(email) {
        const checkUniqueEmail = await this.prisma.user.findUnique({
            where: { email: email },
        });
        if (checkUniqueEmail) {
            return (0, functions_1.errorResponse)('Email already exists', []);
        }
        return (0, functions_1.successResponse)('This email is not use in previous!');
    }
    async checkEmailNickName(email, nickName) {
        const checkUniqueEmail = await this.prisma.user.findUnique({
            where: { email: email },
        });
        if (checkUniqueEmail) {
            return (0, functions_1.errorResponse)('Email already exists', []);
        }
        const checkUniqueNickName = await this.prisma.user.findUnique({
            where: { user_name: nickName },
        });
        if (checkUniqueNickName) {
            return (0, functions_1.errorResponse)('Nickname already exists', []);
        }
        return (0, functions_1.successResponse)('success', []);
    }
    async signup(payload) {
        try {
            const checkUniqueEmail = await this.checkEmailNickName(payload.email, payload.user_name);
            if (checkUniqueEmail.success == false) {
                return checkUniqueEmail;
            }
            const lowerCaseEmail = payload.email.toLocaleLowerCase();
            const hashPassword = await (0, functions_1.hashedPassword)(payload.password);
            const data = Object.assign(Object.assign({}, payload), { status: coreConstant_1.coreConstant.STATUS_ACTIVE, roles: `${coreConstant_1.coreConstant.ROLES.STUDENT}`, email: lowerCaseEmail, password: hashPassword });
            const user = await this.userService.createNewUser(data);
            if (user.success === false) {
                return (0, functions_1.errorResponse)('Signup failed! Please try again later');
            }
            return (0, functions_1.successResponse)('Signup successful, Please verify your email');
        }
        catch (err) {
            (0, functions_1.processException)(err);
        }
    }
    async adminLogin(payload, browserInfo) {
        try {
            const user = await this.validateUser(payload.email, payload.password);
            const is_super_admin = await (0, functions_1.checkRoleIsValid)(user.roles, coreConstant_1.coreConstant.ROLES.SUPER_ADMIN);
            const is_admin = await (0, functions_1.checkRoleIsValid)(user.roles, coreConstant_1.coreConstant.ROLES.ADMIN);
            if (!is_super_admin || !is_admin) {
                return (0, functions_1.errorResponse)('Invalid request to login!');
            }
            if (user.email_verified !== coreConstant_1.coreConstant.IS_VERIFIED) {
                return (0, functions_1.errorResponse)('Email is not verified! Please verify your email first.');
            }
            if (user.status === coreConstant_1.coreConstant.INACTIVE) {
                return (0, functions_1.errorResponse)('Your Account is disabled by admin!');
            }
            const data = { sub: user.id, email: user.email };
            const accessToken = await this.generateAccessToken(data);
            const refreshToken = await this.createRefreshToken({ sub: data.sub, email: data.email }, browserInfo);
            const userData = {
                accessToken: accessToken,
                refreshToken: refreshToken,
                user: user,
                user_roles: await (0, functions_1.userRolesPermissionObject)(user.roles),
            };
            return (0, functions_1.successResponse)('Login successful', userData);
        }
        catch (err) {
            return (0, functions_1.errorResponse)('Invalid email or password', []);
        }
    }
    async studentOrInstructorLogin(payload, browserInfo) {
        try {
            const user = await this.validateUser(payload.email, payload.password);
            const is_super_admin = await (0, functions_1.checkRoleIsValid)(user.roles, coreConstant_1.coreConstant.ROLES.SUPER_ADMIN);
            const is_admin = await (0, functions_1.checkRoleIsValid)(user.roles, coreConstant_1.coreConstant.ROLES.ADMIN);
            if (is_super_admin || is_admin) {
                return (0, functions_1.errorResponse)('Invalid request to login!');
            }
            if (user.email_verified !== coreConstant_1.coreConstant.IS_VERIFIED) {
                return (0, functions_1.errorResponse)('Email is not verified! Please verify your email first.');
            }
            if (user.status === coreConstant_1.coreConstant.INACTIVE) {
                return (0, functions_1.errorResponse)('Your Account is disabled by admin!');
            }
            const data = { sub: user.id, email: user.email };
            const accessToken = await this.generateAccessToken(data);
            const refreshToken = await this.createRefreshToken({ sub: data.sub, email: data.email }, browserInfo);
            const userData = {
                accessToken: accessToken,
                refreshToken: refreshToken,
                user: user,
                user_roles: await (0, functions_1.userRolesPermissionObject)(user.roles),
            };
            return (0, functions_1.successResponse)('Login successful', userData);
        }
        catch (err) {
            return (0, functions_1.errorResponse)('Invalid email or password', []);
        }
    }
    async refreshToken(refreshToken, browserInfo) {
        try {
            const refreshTokenContent = await this.jwtService.verifyAsync(refreshToken, jwt_config_1.refreshJwtConfig);
            await this.validateRefreshToken(refreshToken, refreshTokenContent);
            const accessToken = await this.generateAccessToken({
                sub: refreshTokenContent.sub,
                email: refreshTokenContent.email,
            });
            const newRefreshToken = await this.rotateRefreshToken(refreshToken, refreshTokenContent, browserInfo);
            const userData = {
                accessToken: accessToken,
                refreshToken: newRefreshToken,
                user: [],
            };
            return (0, functions_1.successResponse)('Refresh token', userData);
        }
        catch (err) {
            return (0, functions_1.errorResponse)('Something went wrong', []);
        }
    }
    async logout(refreshToken) {
        try {
            await this.prisma.userTokens.deleteMany({ where: { refreshToken } });
            return (0, functions_1.successResponse)('Logout successful', []);
        }
        catch (err) {
            return (0, functions_1.errorResponse)('Something went wrong', []);
        }
    }
    async logoutAll(userId) {
        try {
            await this.prisma.userTokens.deleteMany({ where: { userId } });
            return (0, functions_1.successResponse)('Logout successful', []);
        }
        catch (err) {
            return (0, functions_1.errorResponse)('Something went wrong', []);
        }
    }
    async findAllTokens(userId) {
        const tokens = await this.prisma.userTokens.findMany({
            where: { userId },
        });
        return tokens;
    }
    async validateUser(email, password) {
        const user = await this.userService.findByEmail(email);
        if (user) {
            const isPasswordValid = await (0, bcrypt_1.compare)(password, user.password);
            if (isPasswordValid) {
                return Object.assign(Object.assign({}, user), { password: undefined });
            }
        }
        throw new invalid_email_or_password_exception_1.InvalidEmailOrPasswordException();
    }
    async generateAccessToken(payload) {
        const accessToken = this.jwtService.sign(payload, jwt_config_1.accessJwtConfig);
        return accessToken;
    }
    async createRefreshToken(payload, browserInfo) {
        if (!payload.tokenFamily) {
            payload.tokenFamily = (0, uuid_1.v4)();
        }
        const refreshToken = this.jwtService.sign(Object.assign({}, payload), jwt_config_1.refreshJwtConfig);
        this.saveRefreshToken({
            userId: payload.sub,
            refreshToken,
            family: payload.tokenFamily,
            browserInfo,
        });
        return refreshToken;
    }
    async saveRefreshToken(refreshTokenCredentials) {
        const expiresAt = (0, getTokenExpirationDate_1.getTokenExpirationDate)();
        await this.prisma.userTokens.create({
            data: Object.assign(Object.assign({}, refreshTokenCredentials), { expiresAt }),
        });
    }
    async validateRefreshToken(refreshToken, refreshTokenContent) {
        const userTokens = await this.prisma.userTokens.findMany({
            where: { userId: refreshTokenContent.sub, refreshToken },
        });
        const isRefreshTokenValid = userTokens.length > 0;
        if (!isRefreshTokenValid) {
            await this.removeRefreshTokenFamilyIfCompromised(refreshTokenContent.sub, refreshTokenContent.tokenFamily);
            throw new invalid_refresh_token_exception_1.InvalidRefreshTokenException();
        }
        return true;
    }
    async removeRefreshTokenFamilyIfCompromised(userId, tokenFamily) {
        const familyTokens = await this.prisma.userTokens.findMany({
            where: { userId, family: tokenFamily },
        });
        if (familyTokens.length > 0) {
            await this.prisma.userTokens.deleteMany({
                where: { userId, family: tokenFamily },
            });
        }
    }
    async rotateRefreshToken(refreshToken, refreshTokenContent, browserInfo) {
        await this.prisma.userTokens.deleteMany({ where: { refreshToken } });
        const newRefreshToken = await this.createRefreshToken({
            sub: refreshTokenContent.sub,
            email: refreshTokenContent.email,
            tokenFamily: refreshTokenContent.tokenFamily,
        }, browserInfo);
        return newRefreshToken;
    }
    async validateUserByEmail(email) {
        const user = await this.userService.findByEmail(email);
        if (user) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        return null;
    }
    async forgotEmail(payload) {
        try {
            const user = await this.validateUserByEmail(payload.email);
            if (user) {
                const response = await this.userService.sendForgotPasswordEmailProcess(user.email);
                if (!response.success) {
                    return response;
                }
                return (0, functions_1.successResponse)('We sent an email code to verify .Please check your email if the email is correct', []);
            }
            else {
                return (0, functions_1.errorResponse)('Invalid Email!', []);
            }
        }
        catch (err) {
            (0, functions_1.processException)(err);
        }
    }
    async resetPassword(payload) {
        try {
            const user = await this.validateUserByEmail(payload.email);
            if (!user) {
                return (0, functions_1.errorResponse)('email does not exist', []);
            }
            if (payload.password !== payload.confirmPassword) {
                return (0, functions_1.errorResponse)('Password and confirm password are not match!');
            }
            const verified = await this.userVerificationCodeService.verifyUserCode(user.id, payload.code, coreConstant_1.coreConstant.VERIFICATION_TYPE_EMAIL);
            if (verified.success === false) {
                return (0, functions_1.errorResponse)(verified.message);
            }
            const updatedPassword = await functions_1.PrismaClient.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    password: (await (0, functions_1.hashedPassword)(payload.password)).toString(),
                },
            });
            if (!updatedPassword) {
                return (0, functions_1.errorResponse)('Password update failed!');
            }
            return (0, functions_1.successResponse)('Password updated successfully');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async verifyEmail(payload) {
        try {
            const user = await this.validateUserByEmail(payload.email);
            if (!user) {
                return (0, functions_1.errorResponse)('Email address doesnot exist!');
            }
            const verified = await this.userVerificationCodeService.verifyUserCode(user.id, payload.code, coreConstant_1.coreConstant.VERIFICATION_TYPE_EMAIL);
            if (verified.success === false) {
                return (0, functions_1.errorResponse)(verified.message);
            }
            await functions_1.PrismaClient.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    email_verified: coreConstant_1.coreConstant.IS_VERIFIED,
                },
            });
            return (0, functions_1.successResponse)('Verification code successfully validated');
        }
        catch (error) {
            return (0, functions_1.errorResponse)('Invalid email', error);
        }
    }
    async googleLogin(req, googleCred, browserInfo) {
        try {
            const { credential, clientId } = googleCred;
            const client = new google_auth_library_1.OAuth2Client(clientId);
            const ticket = await client.verifyIdToken({
                idToken: credential,
                audience: clientId,
            });
            const getPayload = ticket.getPayload();
            if (getPayload.aud !== clientId) {
                return (0, functions_1.errorResponse)('Invalid token');
            }
            const existingUser = await this.validateUserByEmail(getPayload.email);
            const hashPassword = await (0, functions_1.hashedPassword)(Date.now().toString());
            if (!existingUser) {
                const newUser = await this.userService.createNewUser({
                    email: getPayload.email,
                    first_name: getPayload.given_name,
                    last_name: getPayload.family_name,
                    password: hashPassword,
                    provider: 'google',
                    email_verified: coreConstant_1.coreConstant.IS_VERIFIED,
                    status: coreConstant_1.coreConstant.ACTIVE,
                    roles: `${coreConstant_1.coreConstant.ROLES.STUDENT}`,
                }, false);
                if (!newUser.success) {
                    return (0, functions_1.errorResponse)('User registration failed');
                }
            }
            else {
                if (existingUser.status === coreConstant_1.coreConstant.INACTIVE) {
                    return (0, functions_1.errorResponse)('Your Account is disabled by admin!');
                }
            }
            const user = await this.validateUserByEmail(getPayload.email);
            if (user.email_verified !== coreConstant_1.coreConstant.IS_VERIFIED) {
                return (0, functions_1.errorResponse)('Email is not verified! Please verify your email first.');
            }
            const data = { sub: user.id, email: user.email };
            const accessToken = await this.generateAccessToken(data);
            const refreshToken = await this.createRefreshToken({ sub: data.sub, email: data.email }, browserInfo);
            const userData = {
                accessToken: accessToken,
                refreshToken: refreshToken,
                user: user,
                isAdmin: user.roles === coreConstant_1.coreConstant.ROLES.ADMIN,
            };
            return (0, functions_1.successResponse)('Login successful', userData);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async githubLogin(payload, browserInfo) {
        try {
            const code = payload.code ? payload.code : '';
            const githubCredentials = await (0, getAdminSettingsData_1.getAdminSettingsData)(array_constants_1.GithubAuthCredentialsSlugs);
            const gitHubFirstResponse = await axios_1.default.post('https://github.com/login/oauth/access_token', {
                client_id: githubCredentials.github_auth_client_id,
                client_secret: githubCredentials.github_auth_client_secret,
                code: code,
            }, {
                headers: {
                    Accept: 'application/json',
                },
            });
            const gitHubFirstResponseData = gitHubFirstResponse.data;
            if (gitHubFirstResponseData.error) {
                return (0, functions_1.errorResponse)(gitHubFirstResponseData.error_description);
            }
            const headers = {
                Authorization: `Bearer ${gitHubFirstResponseData.access_token}`,
            };
            const githubResponse = await axios_1.default.get('https://api.github.com/user', {
                headers,
            });
            const githubUserDetails = githubResponse.data;
            const existingUser = await this.validateUserByEmail(githubUserDetails.email);
            const hashPassword = await (0, functions_1.hashedPassword)(Date.now().toString());
            if (!existingUser) {
                const githubUserName = githubUserDetails.name.split(' ');
                const newUser = await this.userService.createNewUser({
                    email: githubUserDetails.email,
                    first_name: githubUserName[0],
                    last_name: githubUserName.length > 1 ? githubUserName[1] : '',
                    password: hashPassword,
                    provider: 'github',
                    email_verified: coreConstant_1.coreConstant.IS_VERIFIED,
                    status: coreConstant_1.coreConstant.ACTIVE,
                    roles: `${coreConstant_1.coreConstant.ROLES.STUDENT}`,
                }, false);
                if (!newUser.success) {
                    return (0, functions_1.errorResponse)('User registration failed');
                }
            }
            else {
                if (existingUser.status === coreConstant_1.coreConstant.INACTIVE) {
                    return (0, functions_1.errorResponse)('Your Account is disabled by admin!');
                }
            }
            const user = await this.validateUserByEmail(githubUserDetails.email);
            if (user.email_verified !== coreConstant_1.coreConstant.IS_VERIFIED) {
                return (0, functions_1.errorResponse)('Email is not verified! Please verify your email first.');
            }
            const data = { sub: user.id, email: user.email };
            const accessToken = await this.generateAccessToken(data);
            const refreshToken = await this.createRefreshToken({ sub: data.sub, email: data.email }, browserInfo);
            const userData = {
                accessToken: accessToken,
                refreshToken: refreshToken,
                user: user,
                isAdmin: user.role === coreConstant_1.coreConstant.ROLES.ADMIN,
            };
            return (0, functions_1.successResponse)('Login successful', userData);
        }
        catch (error) {
            if (error.response) {
                console.error('GitHub API Error Response:', error);
                return (0, functions_1.errorResponse)('response error', error.response.data);
            }
            (0, functions_1.processException)(error);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        prisma_service_1.PrismaService,
        jwt_1.JwtService,
        user_verify_code_service_1.UserVerificationCodeService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map