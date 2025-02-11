"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqService = void 0;
const common_1 = require("@nestjs/common");
const functions_1 = require("../../shared/helpers/functions");
let FaqService = class FaqService {
    async addNewFaq(payload) {
        try {
            const faqDetails = await functions_1.PrismaClient.faq.create({
                data: {
                    type: payload.type,
                    question: payload.question,
                    answer: payload.answer,
                    status: payload.status,
                },
            });
            return (0, functions_1.successResponse)('Faq is added successfully!', faqDetails);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getFaqListByFilterByPaginate(payload) {
        try {
            const whereCondition = payload.search
                ? {
                    OR: [
                        {
                            answer: {
                                contains: payload.search,
                            },
                        },
                        {
                            question: {
                                contains: payload.search,
                            },
                        },
                        isNaN(Number(payload.search))
                            ? {}
                            : { type: Number(payload.search) },
                    ],
                }
                : {};
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            const faqList = await functions_1.PrismaClient.faq.findMany(Object.assign({ where: whereCondition }, paginate));
            const data = {
                list: faqList,
                meta: await (0, functions_1.paginationMetaData)('faq', payload, whereCondition),
            };
            return (0, functions_1.successResponse)('Faq list by filter and paginate', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getFaqDetails(id) {
        try {
            const faqDetails = await functions_1.PrismaClient.faq.findFirst({
                where: {
                    id: id,
                },
            });
            if (!faqDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            return (0, functions_1.successResponse)('Faq details', faqDetails);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async updateFaq(id, payload) {
        try {
            const faqDetails = await functions_1.PrismaClient.faq.findFirst({
                where: {
                    id: id,
                },
            });
            if (!faqDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            const updateFaq = await functions_1.PrismaClient.faq.update({
                where: {
                    id: faqDetails.id,
                },
                data: {
                    type: payload.type,
                    question: payload.question,
                    answer: payload.answer,
                    status: payload.status,
                },
            });
            return (0, functions_1.successResponse)('Faq is updated');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async deleteFaq(id) {
        try {
            const faqDetails = await functions_1.PrismaClient.faq.findFirst({
                where: {
                    id: id,
                },
            });
            if (!faqDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            await functions_1.PrismaClient.faq.delete({
                where: {
                    id: faqDetails.id,
                },
            });
            return (0, functions_1.successResponse)('Faq is deleted successfully!');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
};
FaqService = __decorate([
    (0, common_1.Injectable)()
], FaqService);
exports.FaqService = FaqService;
//# sourceMappingURL=faq.service.js.map