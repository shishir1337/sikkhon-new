"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsAdmin = exports.IS_ADMIN_KEY = void 0;
const common_1 = require("@nestjs/common");
const admin_roles_guard_1 = require("../guards/admin-roles.guard");
exports.IS_ADMIN_KEY = 'isAdmin';
function IsAdmin() {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)(exports.IS_ADMIN_KEY, true), (0, common_1.UseGuards)(admin_roles_guard_1.RolesGuard));
}
exports.IsAdmin = IsAdmin;
//# sourceMappingURL=is-admin.decorator.js.map