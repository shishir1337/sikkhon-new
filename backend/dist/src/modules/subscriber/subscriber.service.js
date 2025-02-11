"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriberService = void 0;
const common_1 = require("@nestjs/common");
const functions_1 = require("../../shared/helpers/functions");
let SubscriberService = class SubscriberService {
    async subscribe(payload) {
        try {
            const alreadySubscribed = await functions_1.PrismaClient.subscriber.findFirst({
                where: {
                    email: payload.email,
                },
            });
            if (alreadySubscribed) {
                return (0, functions_1.errorResponse)('You already subscribed with this mail!');
            }
            const subscribed = await functions_1.PrismaClient.subscriber.create({
                data: {
                    email: payload.email,
                },
            });
            return (0, functions_1.successResponse)('Subscribed successfully!');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getSubscriberListByFilterPaginate(payload) {
        try {
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            const whereCondition = {
                email: {
                    contains: payload.search,
                },
            };
            const subscriberList = await functions_1.PrismaClient.subscriber.findMany(Object.assign({ where: whereCondition, orderBy: {
                    created_at: 'desc',
                } }, paginate));
            const data = {
                list: subscriberList,
                meta: await (0, functions_1.paginationMetaData)('subscriber', payload, whereCondition),
            };
            return (0, functions_1.successResponse)('Subscriber list', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
};
SubscriberService = __decorate([
    (0, common_1.Injectable)()
], SubscriberService);
exports.SubscriberService = SubscriberService;
//# sourceMappingURL=subscriber.service.js.map