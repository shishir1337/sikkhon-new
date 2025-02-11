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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../user/users.service");
const is_admin_decorator_1 = require("../../../shared/decorators/is-admin.decorator");
const is_instructor_decorator_1 = require("../../../shared/decorators/is-instructor.decorator");
const admin_service_1 = require("./admin.service");
const create_new_user_dto_1 = require("./dto/create-new-user.dto");
const create_new_admin_dto_1 = require("./dto/create-new-admin.dto");
const user_decorators_1 = require("../../../shared/decorators/user.decorators");
let AdminController = class AdminController {
    constructor(userService, adminService) {
        this.userService = userService;
        this.adminService = adminService;
    }
    createNewUser(payload) {
        return this.adminService.createNewUser(payload);
    }
    createNewAdmin(payload) {
        return this.adminService.createNewAdmin(payload);
    }
    getStudentList(payload) {
        return this.adminService.getStudentList(payload);
    }
    getAdminDashboardDetails() {
        return this.adminService.getAdminDashboardInfo();
    }
    getInstructorList(payload) {
        return this.adminService.getInstructorList(payload);
    }
    getInstructorListNoPagination() {
        return this.adminService.getInstructorListNoPagination();
    }
    getAdminList(payload) {
        return this.adminService.getAdminList(payload);
    }
    statusChangeUser(payload) {
        return this.userService.statusChangeUser(payload);
    }
};
__decorate([
    (0, common_1.Post)('create-new-user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_new_user_dto_1.CreateNewUserDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createNewUser", null);
__decorate([
    (0, common_1.Post)('create-new-admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_new_admin_dto_1.CreateNewAdminDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createNewAdmin", null);
__decorate([
    (0, common_1.Get)('get-student-list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getStudentList", null);
__decorate([
    (0, common_1.Get)('admin-dashboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getAdminDashboardDetails", null);
__decorate([
    (0, common_1.Get)('get-instructor-list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getInstructorList", null);
__decorate([
    (0, common_1.Get)('get-instructor-list-no-pagination'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getInstructorListNoPagination", null);
__decorate([
    (0, common_1.Get)('get-admin-list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getAdminList", null);
__decorate([
    (0, common_1.Post)('status-change-user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "statusChangeUser", null);
AdminController = __decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        admin_service_1.AdminService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map