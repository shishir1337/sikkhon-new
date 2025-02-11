"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsRequiredAndNotEmptyIfAgoraStatus = exports.UpdateAgoraCredentialsDto = void 0;
const class_validator_1 = require("class-validator");
const array_constants_1 = require("../../../../shared/constants/array.constants");
class UpdateAgoraCredentialsDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsIn)(array_constants_1.StatusOnOffArray),
    __metadata("design:type", Number)
], UpdateAgoraCredentialsDto.prototype, "agora_status", void 0);
__decorate([
    IsRequiredAndNotEmptyIfAgoraStatus(1, {
        message: 'Both Agora App ID and Agora App Secret are required when Agora Status is 1',
    }, 'agora_app_id'),
    __metadata("design:type", String)
], UpdateAgoraCredentialsDto.prototype, "agora_app_id", void 0);
__decorate([
    IsRequiredAndNotEmptyIfAgoraStatus(1, {
        message: 'Both Agora App ID and Agora App Secret are required when Agora Status is 1',
    }, 'app_certificate'),
    __metadata("design:type", String)
], UpdateAgoraCredentialsDto.prototype, "app_certificate", void 0);
exports.UpdateAgoraCredentialsDto = UpdateAgoraCredentialsDto;
function IsRequiredAndNotEmptyIfAgoraStatus(value, validationOptions, field_name) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isRequiredAndNotEmptyIfAgoraStatus',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [value],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const agoraStatus = args.object['agora_status'];
                    const fieldValue = args.object[field_name];
                    if (agoraStatus === value && !fieldValue) {
                        return false;
                    }
                    return true;
                },
                defaultMessage(args) {
                    const agoraStatus = args.object['agora_status'];
                    if (agoraStatus === value) {
                        const fieldLabel = field_name === 'agora_app_id'
                            ? 'Agora App ID'
                            : 'Agora App Secret';
                        return `${fieldLabel} is required when Agora Status is ${value}`;
                    }
                    return '';
                },
            },
        });
    };
}
exports.IsRequiredAndNotEmptyIfAgoraStatus = IsRequiredAndNotEmptyIfAgoraStatus;
//# sourceMappingURL=update-agora-credentials.dto.js.map