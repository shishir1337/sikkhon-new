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
exports.AgoraTokenService = void 0;
const common_1 = require("@nestjs/common");
const agora_access_token_1 = require("agora-access-token");
const functions_1 = require("../../shared/helpers/functions");
const response_model_1 = require("../../shared/models/response.model");
let AgoraTokenService = class AgoraTokenService {
    constructor() { }
    async generateAccessToken(channelName, uid) {
        try {
            const appID = 'dd92cc9b60f444119dee217688333add';
            const appCertificate = 'aad97f7df39045ba906cbd238128421a';
            const channelName = 'lol564654646546546';
            const uid = 0;
            const expirationTimeInSeconds = 35555500;
            const role = agora_access_token_1.RtcRole.PUBLISHER;
            const currentTimestamp = Math.floor(Date.now() / 1000);
            const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
            const token = agora_access_token_1.RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpiredTs);
            return (0, functions_1.successResponse)('success', {
                token,
            });
        }
        catch (error) {
            console.error('Error generating Agora access token:', error);
            throw error;
        }
    }
};
AgoraTokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AgoraTokenService);
exports.AgoraTokenService = AgoraTokenService;
//# sourceMappingURL=class.service.js.map