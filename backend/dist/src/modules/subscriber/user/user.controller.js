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
exports.UserSubscriberController = void 0;
const common_1 = require("@nestjs/common");
const subscribe_dto_1 = require("./dto/subscribe.dto");
const subscriber_service_1 = require("../subscriber.service");
const public_decorator_1 = require("../../../shared/decorators/public.decorator");
let UserSubscriberController = class UserSubscriberController {
    constructor(subscriberService) {
        this.subscriberService = subscriberService;
    }
    subscribe(payload) {
        return this.subscriberService.subscribe(payload);
    }
};
__decorate([
    (0, common_1.Post)('subscribe'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subscribe_dto_1.SubscribeDto]),
    __metadata("design:returntype", void 0)
], UserSubscriberController.prototype, "subscribe", null);
UserSubscriberController = __decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [subscriber_service_1.SubscriberService])
], UserSubscriberController);
exports.UserSubscriberController = UserSubscriberController;
//# sourceMappingURL=user.controller.js.map