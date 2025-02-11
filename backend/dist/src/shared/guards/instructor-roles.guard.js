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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructorRolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const coreConstant_1 = require("../helpers/coreConstant");
const is_instructor_decorator_1 = require("../decorators/is-instructor.decorator");
let InstructorRolesGuard = class InstructorRolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        var _a;
        const isInstructor = this.reflector.getAllAndOverride(is_instructor_decorator_1.IS_INSTRUCTOR_KEY, [context.getHandler(), context.getClass()]);
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const userRoles = ((_a = user === null || user === void 0 ? void 0 : user.roles) === null || _a === void 0 ? void 0 : _a.split(',').map((role) => Number(role))) || [];
        const Instructor = userRoles.includes(coreConstant_1.coreConstant.ROLES.INSTRUCTOR);
        if (isInstructor && Instructor) {
            return true;
        }
        return false;
    }
};
InstructorRolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], InstructorRolesGuard);
exports.InstructorRolesGuard = InstructorRolesGuard;
//# sourceMappingURL=instructor-roles.guard.js.map