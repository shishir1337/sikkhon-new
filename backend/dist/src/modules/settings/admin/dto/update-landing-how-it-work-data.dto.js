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
exports.UpdateLandingHowItWorkSectionDataDto = void 0;
const class_validator_1 = require("class-validator");
class UpdateLandingHowItWorkSectionDataDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLandingHowItWorkSectionDataDto.prototype, "landing_how_it_work_first_title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLandingHowItWorkSectionDataDto.prototype, "landing_how_it_work_list_first_title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLandingHowItWorkSectionDataDto.prototype, "landing_how_it_work_list_first_description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLandingHowItWorkSectionDataDto.prototype, "landing_how_it_work_list_second_title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLandingHowItWorkSectionDataDto.prototype, "landing_how_it_work_list_second_description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLandingHowItWorkSectionDataDto.prototype, "landing_how_it_work_list_third_title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLandingHowItWorkSectionDataDto.prototype, "landing_how_it_work_list_third_description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateLandingHowItWorkSectionDataDto.prototype, "landing_how_it_work_list_first_image_url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateLandingHowItWorkSectionDataDto.prototype, "landing_how_it_work_list_second_image_url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateLandingHowItWorkSectionDataDto.prototype, "landing_how_it_work_list_third_image_url", void 0);
exports.UpdateLandingHowItWorkSectionDataDto = UpdateLandingHowItWorkSectionDataDto;
//# sourceMappingURL=update-landing-how-it-work-data.dto.js.map