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
exports.UpdateTermsPrivacyDto = void 0;
const class_validator_1 = require("class-validator");
const array_constants_1 = require("../../../../shared/constants/array.constants");
class UpdateTermsPrivacyDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsIn)(array_constants_1.StatusOnOffArray),
    __metadata("design:type", Number)
], UpdateTermsPrivacyDto.prototype, "privacy_policy_status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTermsPrivacyDto.prototype, "privacy_policy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTermsPrivacyDto.prototype, "terms_condition", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsIn)(array_constants_1.StatusOnOffArray),
    __metadata("design:type", Number)
], UpdateTermsPrivacyDto.prototype, "terms_condition_status", void 0);
exports.UpdateTermsPrivacyDto = UpdateTermsPrivacyDto;
//# sourceMappingURL=update-terms-privacy.dt.js.map