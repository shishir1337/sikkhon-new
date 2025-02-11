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
exports.AdminLiveClassController = void 0;
const common_1 = require("@nestjs/common");
const class_service_1 = require("../class.service");
let AdminLiveClassController = class AdminLiveClassController {
    constructor(AgoraTokenService) {
        this.AgoraTokenService = AgoraTokenService;
    }
    createLiveClass() {
        return this.AgoraTokenService.generateAccessToken('onion', '123456789');
    }
};
__decorate([
    (0, common_1.Post)('create-live-class'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminLiveClassController.prototype, "createLiveClass", null);
AdminLiveClassController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [class_service_1.AgoraTokenService])
], AdminLiveClassController);
exports.AdminLiveClassController = AdminLiveClassController;
//# sourceMappingURL=admin-live-class.controller.js.map