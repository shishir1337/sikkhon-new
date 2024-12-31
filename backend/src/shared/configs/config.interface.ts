import { type } from "os";

export interface Config {
  nest: NestConfig;
  cors: CorsConfig;
  swagger: SwaggerConfig;
  security: SecurityConfig;
}

export interface NestConfig {
  port: number;
}

export interface CorsConfig {
  enabled: boolean;
}

export interface SwaggerConfig {
  enabled: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
}

export interface GraphqlConfig {
  playgroundEnabled: boolean;
  debug: boolean;
  schemaDestination: string;
  sortSchema: boolean;
}

export interface SecurityConfig {
  expiresIn: number;
  bcryptSaltOrRound: string | number;
}
export interface SmtpConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  encryption: string;
}

export interface MailConfig {
  defaultMailer: string;
  mailers: {
    smtp: SmtpConfig;
  };
  from: {
    address: string;
    name: string;
  };
}

export interface GoogleAuthConfig {
  client_id: string;
  client_secret: string;
}
