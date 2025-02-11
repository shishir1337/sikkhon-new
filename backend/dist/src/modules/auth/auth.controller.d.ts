import { AuthService } from './auth.service';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { LoginResponse } from './dto/login.response';
import { Request } from 'express';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LogoutDto } from './dto/logout.dto';
import { UserTokens } from '@prisma/client';
import { ForgotCredentialsDto } from './dto/forgot-credentials.dto';
import { VerifyEmailCredentialsDto } from './dto/verify-email-credentials.dto';
import { ResetPasswordCredentialsDto } from './dto/reset-password.dto';
import { GoogleSignInDto } from './dto/googleCred.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(payload: SignupCredentialsDto): Promise<import("../../shared/models/response.model").ResponseModel>;
    forgotPassword(payload: ForgotCredentialsDto): Promise<import("../../shared/models/response.model").ResponseModel>;
    resetPassword(payload: ResetPasswordCredentialsDto): Promise<import("../../shared/models/response.model").ResponseModel>;
    verifyEmail(payload: VerifyEmailCredentialsDto): Promise<import("../../shared/models/response.model").ResponseModel>;
    adminLogin(payload: LoginCredentialsDto, request: Request): Promise<LoginResponse>;
    studentOrInstructorLogin(payload: LoginCredentialsDto, request: Request): Promise<LoginResponse>;
    refreshToken({ refreshToken }: RefreshTokenDto, request: Request): Promise<LoginResponse>;
    logout({ refreshToken }: LogoutDto): Promise<import("../../shared/models/response.model").ResponseModel>;
    googleLogin(request: Request, googleCred: GoogleSignInDto): Promise<import("../../shared/models/response.model").ResponseModel>;
    logoutAll(request: Request): Promise<import("../../shared/models/response.model").ResponseModel>;
    findAllTokens(request: Request): Promise<UserTokens[]>;
    githubLogin(payload: any): Promise<import("../../shared/models/response.model").ResponseModel>;
}
