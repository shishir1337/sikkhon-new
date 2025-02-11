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
exports.AdminFollowerController = void 0;
const common_1 = require("@nestjs/common");
const follower_service_1 = require("../follower.service");
const is_admin_decorator_1 = require("../../../shared/decorators/is-admin.decorator");
let AdminFollowerController = class AdminFollowerController {
    constructor(followerService) {
        this.followerService = followerService;
    }
    getInstructorFollowerList(id, payload) {
        return this.followerService.getInstructorFollowerList(id, payload);
    }
};
__decorate([
    (0, common_1.Get)('instructor-follower-list-:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AdminFollowerController.prototype, "getInstructorFollowerList", null);
AdminFollowerController = __decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [follower_service_1.FollowerService])
], AdminFollowerController);
exports.AdminFollowerController = AdminFollowerController;
//# sourceMappingURL=admin-follower.controller.js.map