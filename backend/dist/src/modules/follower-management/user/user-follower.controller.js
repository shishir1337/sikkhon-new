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
exports.UserFollowerController = void 0;
const common_1 = require("@nestjs/common");
const follower_service_1 = require("../follower.service");
const make_follower_dto_1 = require("./dto/make-follower.dto");
const user_decorators_1 = require("../../../shared/decorators/user.decorators");
const user_entity_1 = require("../../users/entities/user.entity");
let UserFollowerController = class UserFollowerController {
    constructor(followerService) {
        this.followerService = followerService;
    }
    makeFollower(user, payload) {
        return this.followerService.makeFollower(user, payload);
    }
};
__decorate([
    (0, common_1.Post)('make-follower'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, make_follower_dto_1.MakeFollowerDto]),
    __metadata("design:returntype", void 0)
], UserFollowerController.prototype, "makeFollower", null);
UserFollowerController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [follower_service_1.FollowerService])
], UserFollowerController);
exports.UserFollowerController = UserFollowerController;
//# sourceMappingURL=user-follower.controller.js.map