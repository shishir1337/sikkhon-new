"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiSecretCheckMiddleware = void 0;
const coreConstant_1 = require("../helpers/coreConstant");
class ApiSecretCheckMiddleware {
    use(req, res, next) {
        const appUrl = req.originalUrl;
        const arr = appUrl.split('/');
        if (arr[1] && arr[1] == `${coreConstant_1.coreConstant.FILE_DESTINATION}`) {
            next();
        }
        else {
            next();
        }
    }
}
exports.ApiSecretCheckMiddleware = ApiSecretCheckMiddleware;
//# sourceMappingURL=apisecret.middleware.js.map