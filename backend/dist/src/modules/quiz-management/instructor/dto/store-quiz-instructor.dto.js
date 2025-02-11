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
exports.StoreQuizByInstructorDto = void 0;
const class_validator_1 = require("class-validator");
const array_constants_1 = require("../../../../shared/constants/array.constants");
class StoreQuizByInstructorDto {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], StoreQuizByInstructorDto.prototype, "course_id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], StoreQuizByInstructorDto.prototype, "section_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], StoreQuizByInstructorDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], StoreQuizByInstructorDto.prototype, "time", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], StoreQuizByInstructorDto.prototype, "max_attempts", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], StoreQuizByInstructorDto.prototype, "pass_mark", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], StoreQuizByInstructorDto.prototype, "expiry_days", void 0);
__decorate([
    (0, class_validator_1.IsIn)(array_constants_1.StatusOnOffArray),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], StoreQuizByInstructorDto.prototype, "display_qus_randomly", void 0);
__decorate([
    (0, class_validator_1.IsIn)(array_constants_1.StatusOnOffArray),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], StoreQuizByInstructorDto.prototype, "display_limited_qus", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], StoreQuizByInstructorDto.prototype, "qus_limit", void 0);
__decorate([
    (0, class_validator_1.IsIn)(array_constants_1.StatusOnOffArray),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], StoreQuizByInstructorDto.prototype, "certificate_included", void 0);
__decorate([
    (0, class_validator_1.IsIn)(array_constants_1.StatusOnOffArray),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], StoreQuizByInstructorDto.prototype, "status", void 0);
exports.StoreQuizByInstructorDto = StoreQuizByInstructorDto;
//# sourceMappingURL=store-quiz-instructor.dto.js.map