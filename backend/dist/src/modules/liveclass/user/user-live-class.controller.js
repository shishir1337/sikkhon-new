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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveClassStudentController = void 0;
const common_1 = require("@nestjs/common");
const live_class_service_1 = require("../live-class.service");
const user_decorators_1 = require("../../../shared/decorators/user.decorators");
const client_1 = require("@prisma/client");
const create_liveclass_dto_1 = require("../instructor/dto/create-liveclass.dto");
let LiveClassStudentController = class LiveClassStudentController {
    constructor(liveClassService) {
        this.liveClassService = liveClassService;
    }
    startLiveClass(user, payload) {
        return this.liveClassService.StudentJoinLiveClass(user, payload.class_id, payload.class_name);
    }
};
__decorate([
    (0, common_1.Post)('join-live-class'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _a : Object, create_liveclass_dto_1.CreateLiveClassDto]),
    __metadata("design:returntype", void 0)
], LiveClassStudentController.prototype, "startLiveClass", null);
LiveClassStudentController = __decorate([
    (0, common_1.Controller)('student'),
    __metadata("design:paramtypes", [live_class_service_1.LiveClassService])
], LiveClassStudentController);
exports.LiveClassStudentController = LiveClassStudentController;
//# sourceMappingURL=user-live-class.controller.js.map