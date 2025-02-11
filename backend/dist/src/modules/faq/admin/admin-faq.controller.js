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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqAdminController = void 0;
const common_1 = require("@nestjs/common");
const faq_service_1 = require("../faq.service");
const add_new_faq_dto_1 = require("./dto/add-new-faq.dto");
let FaqAdminController = class FaqAdminController {
    constructor(faqService) {
        this.faqService = faqService;
    }
    addNewFaq(payload) {
        return this.faqService.addNewFaq(payload);
    }
    getFaqList(payload) {
        return this.faqService.getFaqListByFilterByPaginate(payload);
    }
    getFaqDetails(id) {
        return this.faqService.getFaqDetails(id);
    }
    updateFaq(id, payload) {
        return this.faqService.updateFaq(id, payload);
    }
    deleteFaq(id) {
        return this.faqService.deleteFaq(id);
    }
};
__decorate([
    (0, common_1.Post)('add-new-faq'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_new_faq_dto_1.AddNewFaqDto]),
    __metadata("design:returntype", void 0)
], FaqAdminController.prototype, "addNewFaq", null);
__decorate([
    (0, common_1.Get)('get-faq-list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FaqAdminController.prototype, "getFaqList", null);
__decorate([
    (0, common_1.Get)('get-faq-details-:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FaqAdminController.prototype, "getFaqDetails", null);
__decorate([
    (0, common_1.Put)('update-faq-:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, add_new_faq_dto_1.AddNewFaqDto]),
    __metadata("design:returntype", void 0)
], FaqAdminController.prototype, "updateFaq", null);
__decorate([
    (0, common_1.Delete)('delete-faq-:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FaqAdminController.prototype, "deleteFaq", null);
FaqAdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [faq_service_1.FaqService])
], FaqAdminController);
exports.FaqAdminController = FaqAdminController;
//# sourceMappingURL=admin-faq.controller.js.map