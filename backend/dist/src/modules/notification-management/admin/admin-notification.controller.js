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
exports.AdminNotificationController = void 0;
const common_1 = require("@nestjs/common");
const notification_service_1 = require("../notification.service");
const send_notification_dto_1 = require("./dto/send-notification.dto");
const is_admin_decorator_1 = require("../../../shared/decorators/is-admin.decorator");
let AdminNotificationController = class AdminNotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    sendNotification(payload) {
        return this.notificationService.sendNotification(payload);
    }
};
__decorate([
    (0, common_1.Post)('send-notification'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_notification_dto_1.SendNotificationDto]),
    __metadata("design:returntype", void 0)
], AdminNotificationController.prototype, "sendNotification", null);
AdminNotificationController = __decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], AdminNotificationController);
exports.AdminNotificationController = AdminNotificationController;
//# sourceMappingURL=admin-notification.controller.js.map