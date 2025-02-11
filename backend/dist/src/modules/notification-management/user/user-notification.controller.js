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
exports.UserNotificationController = void 0;
const common_1 = require("@nestjs/common");
const notification_service_1 = require("../notification.service");
const user_decorators_1 = require("../../../shared/decorators/user.decorators");
const user_entity_1 = require("../../users/entities/user.entity");
let UserNotificationController = class UserNotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    getMyNotificationList(user, payload) {
        return this.notificationService.getMyNotificationList(user, payload);
    }
    getNotificationDetails(user, id) {
        return this.notificationService.getNotificationDetails(user, id);
    }
};
__decorate([
    (0, common_1.Get)('my-notification-list'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Object]),
    __metadata("design:returntype", void 0)
], UserNotificationController.prototype, "getMyNotificationList", null);
__decorate([
    (0, common_1.Get)('notification-details-:id'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number]),
    __metadata("design:returntype", void 0)
], UserNotificationController.prototype, "getNotificationDetails", null);
UserNotificationController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], UserNotificationController);
exports.UserNotificationController = UserNotificationController;
//# sourceMappingURL=user-notification.controller.js.map