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
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveClassInstructorController = void 0;
const common_1 = require("@nestjs/common");
const store_live_class_dto_1 = require("./dto/store-live-class.dto");
const live_class_service_1 = require("../live-class.service");
const user_decorators_1 = require("../../../shared/decorators/user.decorators");
const client_1 = require("@prisma/client");
const create_liveclass_dto_1 = require("./dto/create-liveclass.dto");
const is_instructor_decorator_1 = require("../../../shared/decorators/is-instructor.decorator");
let LiveClassInstructorController = class LiveClassInstructorController {
    constructor(liveClassService) {
        this.liveClassService = liveClassService;
    }
    createLiveClass(user, payload) {
        return this.liveClassService.createLiveClass(user, payload);
    }
    updateLiveClass(user, data) {
        return this.liveClassService.updateLiveClass(user, data);
    }
    getLiveClassById(class_id) {
        return this.liveClassService.getLiveClassDetails(class_id);
    }
    getCourseForLiveClasses(user) {
        return this.liveClassService.liveClassCourseList(user);
    }
    getLiveClass(user, payload) {
        return this.liveClassService.getInstructorLiveClasses(user, payload);
    }
    deleteLiveClass(user, payload) {
        return this.liveClassService.deleteLiveClass(user, payload.id);
    }
    startLiveClass(user, payload) {
        return this.liveClassService.InstructorStartLiveClass(user, payload.class_id, payload.class_name);
    }
    leaveLiveClass(user, payload) {
        return this.liveClassService.StudentLeaveLiveClass(user, payload.className);
    }
};
__decorate([
    (0, common_1.Post)('create-live-class'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _a : Object, store_live_class_dto_1.StoreLiveClassDto]),
    __metadata("design:returntype", void 0)
], LiveClassInstructorController.prototype, "createLiveClass", null);
__decorate([
    (0, common_1.Patch)('update-live-class'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _b : Object, store_live_class_dto_1.UpdateLiveClassDto]),
    __metadata("design:returntype", void 0)
], LiveClassInstructorController.prototype, "updateLiveClass", null);
__decorate([
    (0, common_1.Get)('get-live-class/:class_id'),
    __param(0, (0, common_1.Param)('class_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LiveClassInstructorController.prototype, "getLiveClassById", null);
__decorate([
    (0, common_1.Get)('get-course-for-live-classes'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], LiveClassInstructorController.prototype, "getCourseForLiveClasses", null);
__decorate([
    (0, common_1.Get)('get-live-class'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", void 0)
], LiveClassInstructorController.prototype, "getLiveClass", null);
__decorate([
    (0, common_1.Delete)('delete-live-class/:id'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _e : Object, Object]),
    __metadata("design:returntype", void 0)
], LiveClassInstructorController.prototype, "deleteLiveClass", null);
__decorate([
    (0, common_1.Post)('start-live-class'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _f : Object, create_liveclass_dto_1.CreateLiveClassDto]),
    __metadata("design:returntype", void 0)
], LiveClassInstructorController.prototype, "startLiveClass", null);
__decorate([
    (0, common_1.Post)('leave-live-class'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _g : Object, Object]),
    __metadata("design:returntype", void 0)
], LiveClassInstructorController.prototype, "leaveLiveClass", null);
LiveClassInstructorController = __decorate([
    (0, is_instructor_decorator_1.IsInstructor)(),
    (0, common_1.Controller)('instructor'),
    __metadata("design:paramtypes", [live_class_service_1.LiveClassService])
], LiveClassInstructorController);
exports.LiveClassInstructorController = LiveClassInstructorController;
//# sourceMappingURL=liveclass.controller.js.map