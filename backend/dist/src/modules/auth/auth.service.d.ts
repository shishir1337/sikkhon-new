import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { UserTokens } from '@prisma/client';
import { ForgotCredentialsDto } from './dto/forgot-credentials.dto';
import { UsersService } from '../users/user/users.service';
import { ResponseModel } from 'src/shared/models/response.model';
import { PrismaService } from '../prisma/prisma.service';
import { VerifyEmailCredentialsDto } from './dto/verify-email-credentials.dto';
import { UserVerificationCodeService } from '../verification_code/user-verify-code.service';
import { ResetPasswordCredentialsDto } from './dto/reset-password.dto';
import { Request } from 'express';
import { GoogleSignInDto } from './dto/googleCred.dto';
export declare class AuthService {
    private userService;
    private readonly prisma;
    private readonly jwtService;
    private readonly userVerificationCodeService;
    constructor(userService: UsersService, prisma: PrismaService, jwtService: JwtService, userVerificationCodeService: UserVerificationCodeService);
    checkEmail(email: string): Promise<ResponseModel>;
    checkEmailNickName(email: string, nickName: string): Promise<ResponseModel>;
    signup(payload: SignupCredentialsDto): Promise<ResponseModel>;
    adminLogin(payload: LoginCredentialsDto, browserInfo?: string): Promise<any>;
    studentOrInstructorLogin(payload: LoginCredentialsDto, browserInfo?: string): Promise<any>;
    refreshToken(refreshToken: string, browserInfo?: string): Promise<any>;
    logout(refreshToken: string): Promise<ResponseModel>;
    logoutAll(userId: number): Promise<ResponseModel>;
    findAllTokens(userId: number): Promise<UserTokens[]>;
    private validateUser;
    private generateAccessToken;
    private createRefreshToken;
    private saveRefreshToken;
    private validateRefreshToken;
    private removeRefreshTokenFamilyIfCompromised;
    private rotateRefreshToken;
    validateUserByEmail(email: string): Promise<any>;
    forgotEmail(payload: ForgotCredentialsDto): Promise<ResponseModel>;
    resetPassword(payload: ResetPasswordCredentialsDto): Promise<ResponseModel>;
    verifyEmail(payload: VerifyEmailCredentialsDto): Promise<ResponseModel>;
    googleLogin(req: Request, googleCred: GoogleSignInDto, browserInfo?: any): Promise<ResponseModel>;
    githubLogin(payload: any, browserInfo?: any): Promise<ResponseModel>;
}
