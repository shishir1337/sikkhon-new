"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = exports.SUBSCRIPTION_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.SUBSCRIPTION_KEY = 'subscriptionType';
function Subscription(type = 'image') {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)(exports.SUBSCRIPTION_KEY, type));
}
exports.Subscription = Subscription;
//# sourceMappingURL=subcription.decorators.js.map