"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpAddress = exports.UserInfo = void 0;
const common_1 = require("@nestjs/common");
exports.UserInfo = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    delete request.user.password;
    return request.user;
});
exports.IpAddress = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.ip;
});
//# sourceMappingURL=user.decorators.js.map