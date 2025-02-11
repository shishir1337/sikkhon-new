"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidEmailOrPasswordException = void 0;
const auth_service_input_exception_1 = require("./auth-service-input.exception");
class InvalidEmailOrPasswordException extends auth_service_input_exception_1.AuthServiceInputException {
    constructor() {
        super('Invalid email or password');
    }
}
exports.InvalidEmailOrPasswordException = InvalidEmailOrPasswordException;
//# sourceMappingURL=invalid-email-or-password.exception..js.map