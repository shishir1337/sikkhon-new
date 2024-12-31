import { Injectable } from '@nestjs/common';

import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { SignupResponse } from './dto/signup.response';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { LoginResponse } from './dto/login.response';
import { RefreshTokenPayload } from './types/refresh-token-payload';
import { JwtService } from '@nestjs/jwt';

import { User, UserTokens } from '@prisma/client';
import { InvalidEmailOrPasswordException } from './exceptions/invalid-email-or-password.exception.';

import { InvalidRefreshTokenException } from './exceptions/invalid-refresh-token.exception';
import { compare } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import { ForgotCredentialsDto } from './dto/forgot-credentials.dto';
import { UsersService } from '../users/user/users.service';
import { ResponseModel } from 'src/shared/models/response.model';
import {
  PrismaClient,
  checkRoleIsValid,
  createUniqueCode,
  errorResponse,
  hashedPassword,
  processException,
  successResponse,
  userRolesPermissionObject,
} from 'src/shared/helpers/functions';
import { getAdminSettingsData } from 'src/shared/helpers/getAdminSettingsData';
import { PrismaService } from '../prisma/prisma.service';
import { getTokenExpirationDate } from 'src/shared/utils/getTokenExpirationDate';
import {
  accessJwtConfig,
  refreshJwtConfig,
} from 'src/shared/configs/jwt.config';
import { coreConstant } from 'src/shared/helpers/coreConstant';
import { VerifyEmailCredentialsDto } from './dto/verify-email-credentials.dto';
import { UserVerificationCodeService } from '../verification_code/user-verify-code.service';
import { ResetPasswordCredentialsDto } from './dto/reset-password.dto';
import { randomUUID } from 'crypto';
import { Request } from 'express';
import { GoogleSignInDto } from './dto/googleCred.dto';
import { OAuth2Client } from 'google-auth-library';
import {
  GithubAuthCredentialsSlugs,
  GoogleAuthCredentialsSlugs,
} from 'src/shared/constants/array.constants';
import axios from 'axios';
import { ChangePasswordDto } from './dto/change-password.dto';
import { MyLogger } from '../logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userVerificationCodeService: UserVerificationCodeService,
  ) {}

  async checkEmail(email: string) {
    const checkUniqueEmail = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (checkUniqueEmail) {
      return errorResponse('Email already exists', []);
    }

    return successResponse('This email is not use in previous!');
  }
  async checkEmailNickName(email: string, nickName: string) {
    const checkUniqueEmail = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (checkUniqueEmail) {
      return errorResponse('Email already exists', []);
    }
    const checkUniqueNickName = await this.prisma.user.findUnique({
      where: { user_name: nickName },
    });
    if (checkUniqueNickName) {
      return errorResponse('Nickname already exists', []);
    }
    return successResponse('success', []);
  }

  async signup(payload: SignupCredentialsDto): Promise<ResponseModel> {
    try {
      const checkUniqueEmail = await this.checkEmailNickName(
        payload.email,
        payload.user_name,
      );
      if (checkUniqueEmail.success == false) {
        return checkUniqueEmail;
      }
      const lowerCaseEmail = payload.email.toLocaleLowerCase();
      const hashPassword = await hashedPassword(payload.password);
      const data = {
        ...payload,
        status: coreConstant.STATUS_ACTIVE,
        roles: `${coreConstant.ROLES.STUDENT}`,
        email: lowerCaseEmail,
        password: hashPassword,
      };
      const user = await this.userService.createNewUser(data);
      if (user.success === false) {
        return errorResponse('Signup failed! Please try again later');
      }

      return successResponse('Signup successful, Please verify your email');
    } catch (err) {
      processException(err);
    }
  }

  async adminLogin(
    payload: LoginCredentialsDto,
    browserInfo?: string,
  ): Promise<any> {
    try {
      const user = await this.validateUser(payload.email, payload.password);
      const is_super_admin = await checkRoleIsValid(
        user.roles,
        coreConstant.ROLES.SUPER_ADMIN,
      );
      const is_admin = await checkRoleIsValid(
        user.roles,
        coreConstant.ROLES.ADMIN,
      );
      if (!is_super_admin || !is_admin) {
        return errorResponse('Invalid request to login!');
      }

      if (user.email_verified !== coreConstant.IS_VERIFIED) {
        return errorResponse(
          'Email is not verified! Please verify your email first.',
        );
      }

      if (user.status === coreConstant.INACTIVE) {
        return errorResponse('Your Account is disabled by admin!');
      }
      const data = { sub: user.id, email: user.email };

      const accessToken = await this.generateAccessToken(data);

      const refreshToken = await this.createRefreshToken(
        { sub: data.sub, email: data.email },
        browserInfo,
      );

      const userData = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: user,
        user_roles: await userRolesPermissionObject(user.roles),
      };

      return successResponse('Login successful', userData);
    } catch (err) {
      return errorResponse('Invalid email or password', []);
    }
  }

  async studentOrInstructorLogin(
    payload: LoginCredentialsDto,
    browserInfo?: string,
  ): Promise<any> {
    try {
      const user = await this.validateUser(payload.email, payload.password);
      const is_super_admin = await checkRoleIsValid(
        user.roles,
        coreConstant.ROLES.SUPER_ADMIN,
      );
      const is_admin = await checkRoleIsValid(
        user.roles,
        coreConstant.ROLES.ADMIN,
      );
      if (is_super_admin || is_admin) {
        return errorResponse('Invalid request to login!');
      }

      if (user.email_verified !== coreConstant.IS_VERIFIED) {
        return errorResponse(
          'Email is not verified! Please verify your email first.',
        );
      }

      if (user.status === coreConstant.INACTIVE) {
        return errorResponse('Your Account is disabled by admin!');
      }
      const data = { sub: user.id, email: user.email };

      const accessToken = await this.generateAccessToken(data);

      const refreshToken = await this.createRefreshToken(
        { sub: data.sub, email: data.email },
        browserInfo,
      );

      const userData = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: user,
        user_roles: await userRolesPermissionObject(user.roles),
      };

      return successResponse('Login successful', userData);
    } catch (err) {
      return errorResponse('Invalid email or password', []);
    }
  }

  async refreshToken(refreshToken: string, browserInfo?: string): Promise<any> {
    try {
      const refreshTokenContent: RefreshTokenPayload =
        await this.jwtService.verifyAsync(refreshToken, refreshJwtConfig);

      await this.validateRefreshToken(refreshToken, refreshTokenContent);

      const accessToken = await this.generateAccessToken({
        sub: refreshTokenContent.sub,
        email: refreshTokenContent.email,
      });

      const newRefreshToken = await this.rotateRefreshToken(
        refreshToken,
        refreshTokenContent,
        browserInfo,
      );

      const userData = {
        accessToken: accessToken,
        refreshToken: newRefreshToken,
        user: [],
      };
      return successResponse('Refresh token', userData);
    } catch (err) {
      return errorResponse('Something went wrong', []);
    }
  }

  async logout(refreshToken: string) {
    try {
      await this.prisma.userTokens.deleteMany({ where: { refreshToken } });
      return successResponse('Logout successful', []);
    } catch (err) {
      return errorResponse('Something went wrong', []);
    }
  }

  async logoutAll(userId: number) {
    try {
      await this.prisma.userTokens.deleteMany({ where: { userId } });
      return successResponse('Logout successful', []);
    } catch (err) {
      return errorResponse('Something went wrong', []);
    }
  }

  async findAllTokens(userId: number): Promise<UserTokens[]> {
    const tokens = await this.prisma.userTokens.findMany({
      where: { userId },
    });

    return tokens;
  }

  private async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const isPasswordValid = await compare(password, user.password);

      if (isPasswordValid) {
        return { ...user, password: undefined };
      }
    }

    throw new InvalidEmailOrPasswordException();
  }

  private async generateAccessToken(payload: {
    sub: number;
    email: string;
  }): Promise<string> {
    const accessToken = this.jwtService.sign(payload, accessJwtConfig);

    return accessToken;
  }

  private async createRefreshToken(
    payload: {
      sub: number;
      email: string;
      tokenFamily?: string;
    },
    browserInfo?: string,
  ): Promise<string> {
    if (!payload.tokenFamily) {
      payload.tokenFamily = uuidV4();
    }

    const refreshToken = this.jwtService.sign({ ...payload }, refreshJwtConfig);

    this.saveRefreshToken({
      userId: payload.sub,
      refreshToken,
      family: payload.tokenFamily,
      browserInfo,
    });

    return refreshToken;
  }

  private async saveRefreshToken(refreshTokenCredentials: {
    userId: number;
    refreshToken: string;
    family: string;
    browserInfo?: string;
  }): Promise<void> {
    const expiresAt = getTokenExpirationDate();

    await this.prisma.userTokens.create({
      data: { ...refreshTokenCredentials, expiresAt },
    });
  }

  private async validateRefreshToken(
    refreshToken: string,
    refreshTokenContent: RefreshTokenPayload,
  ): Promise<boolean> {
    const userTokens = await this.prisma.userTokens.findMany({
      where: { userId: refreshTokenContent.sub, refreshToken },
    });

    const isRefreshTokenValid = userTokens.length > 0;

    if (!isRefreshTokenValid) {
      await this.removeRefreshTokenFamilyIfCompromised(
        refreshTokenContent.sub,
        refreshTokenContent.tokenFamily,
      );

      throw new InvalidRefreshTokenException();
    }

    return true;
  }

  private async removeRefreshTokenFamilyIfCompromised(
    userId: number,
    tokenFamily: string,
  ): Promise<void> {
    const familyTokens = await this.prisma.userTokens.findMany({
      where: { userId, family: tokenFamily },
    });

    if (familyTokens.length > 0) {
      await this.prisma.userTokens.deleteMany({
        where: { userId, family: tokenFamily },
      });
    }
  }

  private async rotateRefreshToken(
    refreshToken: string,
    refreshTokenContent: RefreshTokenPayload,
    browserInfo?: string,
  ): Promise<string> {
    await this.prisma.userTokens.deleteMany({ where: { refreshToken } });

    const newRefreshToken = await this.createRefreshToken(
      {
        sub: refreshTokenContent.sub,
        email: refreshTokenContent.email,
        tokenFamily: refreshTokenContent.tokenFamily,
      },
      browserInfo,
    );

    return newRefreshToken;
  }

  async validateUserByEmail(email: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async forgotEmail(payload: ForgotCredentialsDto): Promise<ResponseModel> {
    try {
      const user = await this.validateUserByEmail(payload.email);
      if (user) {
        const response = await this.userService.sendForgotPasswordEmailProcess(
          user.email,
        );
        if (!response.success) {
          return response;
        }
        return successResponse(
          'We sent an email code to verify .Please check your email if the email is correct',
          [],
        );
      } else {
        return errorResponse('Invalid Email!', []);
      }
    } catch (err) {
      processException(err);
    }
  }
  async resetPassword(
    payload: ResetPasswordCredentialsDto,
  ): Promise<ResponseModel> {
    try {
      const user = await this.validateUserByEmail(payload.email);
      if (!user) {
        return errorResponse('email does not exist', []);
      }
      if (payload.password !== payload.confirmPassword) {
        return errorResponse('Password and confirm password are not match!');
      }

      const verified = await this.userVerificationCodeService.verifyUserCode(
        user.id,
        payload.code,
        coreConstant.VERIFICATION_TYPE_EMAIL,
      );
      if (verified.success === false) {
        return errorResponse(verified.message);
      }

      const updatedPassword = await PrismaClient.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: (await hashedPassword(payload.password)).toString(),
        },
      });
      if (!updatedPassword) {
        return errorResponse('Password update failed!');
      }
      return successResponse('Password updated successfully');
    } catch (error) {
      processException(error);
    }
  }

  async verifyEmail(
    payload: VerifyEmailCredentialsDto,
  ): Promise<ResponseModel> {
    try {
      const user: User = await this.validateUserByEmail(payload.email);
      if (!user) {
        return errorResponse('Email address doesnot exist!');
      }

      const verified = await this.userVerificationCodeService.verifyUserCode(
        user.id,
        payload.code,
        coreConstant.VERIFICATION_TYPE_EMAIL,
      );

      if (verified.success === false) {
        return errorResponse(verified.message);
      }
      await PrismaClient.user.update({
        where: {
          id: user.id,
        },
        data: {
          email_verified: coreConstant.IS_VERIFIED,
        },
      });
      return successResponse('Verification code successfully validated');
      // if(user.)
    } catch (error) {
      return errorResponse('Invalid email', error);
    }
  }

  async googleLogin(
    req: Request,
    googleCred: GoogleSignInDto,
    browserInfo?: any,
  ) {
    try {
      const { credential, clientId } = googleCred;
      const client = new OAuth2Client(clientId);
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: clientId,
      });

      const getPayload: any = ticket.getPayload();

      if (getPayload.aud !== clientId) {
        return errorResponse('Invalid token');
      }

      const existingUser = await this.validateUserByEmail(getPayload.email);
      const hashPassword = await hashedPassword(Date.now().toString());
      if (!existingUser) {
        const newUser = await this.userService.createNewUser(
          {
            email: getPayload.email,
            first_name: getPayload.given_name,
            last_name: getPayload.family_name,
            password: hashPassword,
            provider: 'google',
            email_verified: coreConstant.IS_VERIFIED,
            status: coreConstant.ACTIVE,
            roles: `${coreConstant.ROLES.STUDENT}`,
          },
          false,
        );

        if (!newUser.success) {
          return errorResponse('User registration failed');
        }
      } else {
        if (existingUser.status === coreConstant.INACTIVE) {
          return errorResponse('Your Account is disabled by admin!');
        }
      }

      const user = await this.validateUserByEmail(getPayload.email);

      if (user.email_verified !== coreConstant.IS_VERIFIED) {
        return errorResponse(
          'Email is not verified! Please verify your email first.',
        );
      }

      // Generate an access token
      const data = { sub: user.id, email: user.email };
      const accessToken = await this.generateAccessToken(data);

      // Create a refresh token
      const refreshToken = await this.createRefreshToken(
        { sub: data.sub, email: data.email },
        browserInfo,
      );

      // Prepare the response data
      const userData = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: user,
        isAdmin: user.roles === coreConstant.ROLES.ADMIN,
      };

      return successResponse('Login successful', userData);
    } catch (error) {
      processException(error);
    }
  }

  async githubLogin(payload: any, browserInfo?: any) {
    try {
      const code: string = payload.code ? payload.code : '';

      const githubCredentials: any = await getAdminSettingsData(
        GithubAuthCredentialsSlugs,
      );

      const gitHubFirstResponse: any = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: githubCredentials.github_auth_client_id,
          client_secret: githubCredentials.github_auth_client_secret,
          code: code,
        },
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      const gitHubFirstResponseData = gitHubFirstResponse.data;

      if (gitHubFirstResponseData.error) {
        return errorResponse(gitHubFirstResponseData.error_description);
      }

      const headers = {
        Authorization: `Bearer ${gitHubFirstResponseData.access_token}`,
      };

      const githubResponse = await axios.get('https://api.github.com/user', {
        headers,
      });
      const githubUserDetails = githubResponse.data;

      const existingUser = await this.validateUserByEmail(
        githubUserDetails.email,
      );

      const hashPassword = await hashedPassword(Date.now().toString());
      if (!existingUser) {
        const githubUserName = githubUserDetails.name.split(' ');
        const newUser = await this.userService.createNewUser(
          {
            email: githubUserDetails.email,
            first_name: githubUserName[0],
            last_name: githubUserName.length > 1 ? githubUserName[1] : '',
            password: hashPassword,
            provider: 'github',
            email_verified: coreConstant.IS_VERIFIED,
            status: coreConstant.ACTIVE,
            roles: `${coreConstant.ROLES.STUDENT}`,
          },
          false,
        );

        if (!newUser.success) {
          return errorResponse('User registration failed');
        }
      } else {
        if (existingUser.status === coreConstant.INACTIVE) {
          return errorResponse('Your Account is disabled by admin!');
        }
      }

      const user = await this.validateUserByEmail(githubUserDetails.email);

      if (user.email_verified !== coreConstant.IS_VERIFIED) {
        return errorResponse(
          'Email is not verified! Please verify your email first.',
        );
      }

      // Generate an access token
      const data = { sub: user.id, email: user.email };
      const accessToken = await this.generateAccessToken(data);

      // Create a refresh token
      const refreshToken = await this.createRefreshToken(
        { sub: data.sub, email: data.email },
        browserInfo,
      );

      // Prepare the response data
      const userData = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: user,
        isAdmin: user.role === coreConstant.ROLES.ADMIN,
      };

      return successResponse('Login successful', userData);
    } catch (error) {
      if (error.response) {
        console.error('GitHub API Error Response:', error);
        return errorResponse('response error', error.response.data);
      }
      processException(error);
    }
  }
}
