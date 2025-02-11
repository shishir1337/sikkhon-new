"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsInstructor = exports.IS_INSTRUCTOR_KEY = void 0;
const common_1 = require("@nestjs/common");
const instructor_roles_guard_1 = require("../guards/instructor-roles.guard");
exports.IS_INSTRUCTOR_KEY = 'isInstructor';
function IsInstructor() {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)(exports.IS_INSTRUCTOR_KEY, true), (0, common_1.UseGuards)(instructor_roles_guard_1.InstructorRolesGuard));
}
exports.IsInstructor = IsInstructor;
//# sourceMappingURL=is-instructor.decorator.js.map