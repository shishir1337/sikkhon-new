"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNotNegative = void 0;
const class_validator_1 = require("class-validator");
function IsNotNegative(property) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isNotNegative',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: {
                message: `${property} cannot be a negative value`,
            },
            validator: {
                validate(value, args) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = args.object[relatedPropertyName];
                    return value >= 0;
                },
            },
        });
    };
}
exports.IsNotNegative = IsNotNegative;
//# sourceMappingURL=not-negative.validator.js.map