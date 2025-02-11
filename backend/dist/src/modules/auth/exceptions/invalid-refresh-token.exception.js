"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidRefreshTokenException = void 0;
const auth_service_input_exception_1 = require("./auth-service-input.exception");
class InvalidRefreshTokenException extends auth_service_input_exception_1.AuthServiceInputException {
    constructor() {
        super('Invalid refresh token');
    }
}
exports.InvalidRefreshTokenException = InvalidRefreshTokenException;
//# sourceMappingURL=invalid-refresh-token.exception.js.map