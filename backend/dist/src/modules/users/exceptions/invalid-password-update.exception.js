"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidPasswordUpdateException = void 0;
const user_service_input_exception_1 = require("./user-service-input.exception");
class InvalidPasswordUpdateException extends user_service_input_exception_1.UserServiceInputException {
    constructor() {
        super('Invalid current password');
    }
}
exports.InvalidPasswordUpdateException = InvalidPasswordUpdateException;
//# sourceMappingURL=invalid-password-update.exception.js.map