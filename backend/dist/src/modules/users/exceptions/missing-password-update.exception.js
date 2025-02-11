"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingPasswordUpdateException = void 0;
const user_service_input_exception_1 = require("./user-service-input.exception");
class MissingPasswordUpdateException extends user_service_input_exception_1.UserServiceInputException {
    constructor() {
        super('Please enter both new password and current password');
    }
}
exports.MissingPasswordUpdateException = MissingPasswordUpdateException;
//# sourceMappingURL=missing-password-update.exception.js.map