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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const passport_google_oauth2_1 = require("passport-google-oauth2");
const config_interface_1 = require("../../../shared/configs/config.interface");
let GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth2_1.Strategy, 'google') {
    constructor(configService) {
        super({
            clientID: configService.get('client_id'),
            clientSecret: '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',
            callbackURL: 'http://localhost:3005/api/auth/google/callback',
            scope: ['profile', 'email'],
        });
        this.configService = configService;
    }
    async validate(_accessToken, _refreshToken, profile, done) {
        const { id, name, emails, photos } = profile;
        const user = {
            provider: 'google',
            providerId: id,
            email: emails[0].value,
            first_name: name.givenName,
            last_name: name.familyName,
            name: `${name.givenName} ${name.familyName}`,
            picture: photos[0].value,
        };
        done(null, user);
    }
};
GoogleStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], GoogleStrategy);
exports.GoogleStrategy = GoogleStrategy;
//# sourceMappingURL=googleauth.strategy.js.map