import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { LoginResponse } from './dto/login.response';
import { Request } from 'express';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LogoutDto } from './dto/logout.dto';
import { UserTokens } from '@prisma/client';
import { ForgotCredentialsDto } from './dto/forgot-credentials.dto';
import { Public } from 'src/shared/decorators/public.decorator';
import { VerifyEmailCredentialsDto } from './dto/verify-email-credentials.dto';
import { ResetPasswordCredentialsDto } from './dto/reset-password.dto';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'http';
import { GoogleSignInDto } from './dto/googleCred.dto';
import { MyLogger } from '../logger/logger.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('signup')
  signup(@Body() payload: SignupCredentialsDto) {
    return this.authService.signup(payload);
  }

  @Public()
  @Post('forgot-password')
  forgotPassword(@Body() payload: ForgotCredentialsDto) {
    return this.authService.forgotEmail(payload);
  }
  @Public()
  @Post('reset-password')
  resetPassword(@Body() payload: ResetPasswordCredentialsDto) {
    return this.authService.resetPassword(payload);
  }

  @Public()
  @Post('verify-email')
  verifyEmail(@Body() payload: VerifyEmailCredentialsDto) {
    return this.authService.verifyEmail(payload);
  }

  @Public()
  @Post('admin/login')
  async adminLogin(
    @Body() payload: LoginCredentialsDto,
    @Req() request: Request,
  ): Promise<LoginResponse> {
    const browserInfo =
      `${request.ip} ${request.headers['user-agent']} ${request.headers['accept-language']}`.replace(
        / undefined/g,
        '',
      );
    return this.authService.adminLogin(payload, browserInfo);
  }

  @Public()
  @Post('login')
  async studentOrInstructorLogin(
    @Body() payload: LoginCredentialsDto,
    @Req() request: Request,
  ): Promise<LoginResponse> {
    const browserInfo =
      `${request.ip} ${request.headers['user-agent']} ${request.headers['accept-language']}`.replace(
        / undefined/g,
        '',
      );
    return this.authService.studentOrInstructorLogin(payload, browserInfo);
  }

  /** Refreshes the user token for silent authentication */

  @Post('token-refresh')
  async refreshToken(
    @Body() { refreshToken }: RefreshTokenDto,
    @Req() request: Request,
  ): Promise<LoginResponse> {
    const browserInfo =
      `${request.ip} ${request.headers['user-agent']} ${request.headers['accept-language']}`.replace(
        / undefined/g,
        '',
      );

    return this.authService.refreshToken(refreshToken, browserInfo);
  }

  /** Logs out the User from the current session */

  @Post('logout')
  async logout(@Body() { refreshToken }: LogoutDto) {
    return this.authService.logout(refreshToken);
  }
  @Public()
  @Post('google-login')
  async googleLogin(
    @Req() request: Request,
    @Body() googleCred: GoogleSignInDto,
  ) {
    const browserInfo =
      `${request.ip} ${request.headers['user-agent']} ${request.headers['accept-language']}`.replace(
        / undefined/g,
        '',
      );
    return this.authService.googleLogin(request, googleCred, browserInfo);
  }

  /** Logs out the User from all sessions */

  @Post('logoutAll')
  async logoutAll(@Req() request: Request) {
    const { userId } = request.body.user as { userId: number };

    return this.authService.logoutAll(userId);
  }

  /** Returns all user's active tokens */

  @Get('tokens')
  async findAllTokens(@Req() request: Request): Promise<UserTokens[]> {
    const { userId } = request.body.user as { userId: number };

    return this.authService.findAllTokens(userId);
  }

  // @Public()
  // @Get('google/callback')
  // @UseGuards(AuthGuard('google'))
  // googleAuthRedirect(@Req() request: Request) {
  //   const browserInfo =
  //     `${request.ip} ${request.headers['user-agent']} ${request.headers['accept-language']}`.replace(
  //       / undefined/g,
  //       '',
  //     );
  //   return this.authService.googleLogin(request, browserInfo);
  // }

  @Public()
  @Get('github-login')
  githubLogin(@Query() payload: any) {
    return this.authService.githubLogin(payload);
  }
}
