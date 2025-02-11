"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshJwtConfig = exports.accessJwtConfig = void 0;
exports.accessJwtConfig = {
    secret: process.env.ACCESS_TOKEN_SECRET,
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
};
exports.refreshJwtConfig = {
    secret: process.env.REFRESH_TOKEN_SECRET,
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
};
//# sourceMappingURL=jwt.config.js.map