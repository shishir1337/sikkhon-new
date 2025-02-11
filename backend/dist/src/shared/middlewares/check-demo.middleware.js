"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckDemoMode = void 0;
const functions_1 = require("../helpers/functions");
class CheckDemoMode {
    use(req, res, next) {
        const { method, url } = req;
        const isDemo = process.env.DEMO_MODE;
        const searchString = "/api/admin/";
        const isAdmin = req.originalUrl.includes(searchString);
        if (method === 'POST' && isDemo === 'demo' && isAdmin) {
            res.status(403).json((0, functions_1.errorResponse)('This is disbled for demo!'));
        }
        next();
    }
}
exports.CheckDemoMode = CheckDemoMode;
//# sourceMappingURL=check-demo.middleware.js.map