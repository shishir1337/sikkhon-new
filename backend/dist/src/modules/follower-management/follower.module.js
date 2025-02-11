"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowerModule = void 0;
const common_1 = require("@nestjs/common");
const follower_service_1 = require("./follower.service");
const user_follower_controller_1 = require("./user/user-follower.controller");
const admin_follower_controller_1 = require("./admin/admin-follower.controller");
let FollowerModule = class FollowerModule {
};
FollowerModule = __decorate([
    (0, common_1.Module)({
        controllers: [user_follower_controller_1.UserFollowerController, admin_follower_controller_1.AdminFollowerController],
        providers: [follower_service_1.FollowerService],
    })
], FollowerModule);
exports.FollowerModule = FollowerModule;
//# sourceMappingURL=follower.module.js.map