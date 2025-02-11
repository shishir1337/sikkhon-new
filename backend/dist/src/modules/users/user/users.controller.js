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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dto/create-user.dto");
const users_service_1 = require("./users.service");
const is_admin_decorator_1 = require("../../../shared/decorators/is-admin.decorator");
const functions_1 = require("../../../shared/helpers/functions");
const client_1 = require("@prisma/client");
const coreConstant_1 = require("../../../shared/helpers/coreConstant");
const response_model_1 = require("../../../shared/models/response.model");
const user_decorators_1 = require("../../../shared/decorators/user.decorators");
const update_user_dto_1 = require("./dto/update-user.dto");
const user_entity_1 = require("../entities/user.entity");
const change_password_dto_1 = require("../../auth/dto/change-password.dto");
const is_instructor_decorator_1 = require("../../../shared/decorators/is-instructor.decorator");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getProfile(req, user) {
        return this.userService.getProfile(user);
    }
    getInstructirDashboardInfo(user) {
        return this.userService.getInstructirDashboardInfo(user);
    }
    create(payload) {
        return this.userService.create(payload);
    }
    list(payload) {
        return this.userService.userList(payload);
    }
    updateProfile(user, payload) {
        return this.userService.updateProfile(user, payload);
    }
    checkUserNameIsUnique(user, payload) {
        return this.userService.checkUserNameIsUnique(user, payload);
    }
    becomeAnInstructor(user) {
        return this.userService.becomeAnInstructor(user);
    }
    assignInstructor(payload) {
        return this.userService.assignInstructor(payload.user_id);
    }
    getPendingInstructorApplications(payload) {
        return this.userService.getPendingInstructorApplications(payload);
    }
    getInstructorApplicationStatus(user) {
        return this.userService.getInstructorApplicationStatus(user);
    }
    changeStatus(payload) {
        return this.userService.changeStatus(payload);
    }
    userListByCountryWise() {
        return this.userService.userListByCountryWise();
    }
    userProfileDetails(payload) {
        return this.userService.userProfileDetails(payload);
    }
    updateEmail(user, payload) {
        return this.userService.updateEmail(user, payload);
    }
    testTextGen(payload) {
        return this.userService.testTextGen(payload);
    }
    changePassword(user, payload) {
        return this.userService.changePassword(user, payload);
    }
};
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, user_decorators_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, is_instructor_decorator_1.IsInstructor)(),
    (0, common_1.Get)('instructor-dashboard-info'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getInstructirDashboardInfo", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Post)('create-user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Get)('user-list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "list", null);
__decorate([
    (0, common_1.Post)('update-profile'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _b : Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Post)('check-user-name'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "checkUserNameIsUnique", null);
__decorate([
    (0, common_1.Post)('become-an-instructor'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "becomeAnInstructor", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Post)('assign-an-instructor'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "assignInstructor", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Get)('get-pending-instructor-applications'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getPendingInstructorApplications", null);
__decorate([
    (0, common_1.Get)('get-instructor-application-status'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getInstructorApplicationStatus", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Post)('change-status'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeStatus", null);
__decorate([
    (0, common_1.Get)('user-list-by-country'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userListByCountryWise", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Get)('user-profile-details'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userProfileDetails", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Post)('update-email'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _f : Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateEmail", null);
__decorate([
    (0, common_1.Post)('test-text-gen'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "testTextGen", null);
__decorate([
    (0, common_1.Post)('change-password'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _g : Object, change_password_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "changePassword", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=users.controller.js.map