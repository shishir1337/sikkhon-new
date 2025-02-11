"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const functions_1 = require("../../shared/helpers/functions");
const coreConstant_1 = require("../../shared/helpers/coreConstant");
let NotificationService = class NotificationService {
    async sendNotificationToOneUser(user_id, title, body, redirect_url = null) {
        try {
            await functions_1.PrismaClient.notification.create({
                data: {
                    userId: user_id,
                    title: title,
                    body: body,
                    redirect_url: redirect_url,
                },
            });
            return (0, functions_1.successResponse)('Notification is sent successfully!');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async sendNotificationToAllUser(userIdArray, title, body, redirect_url = null) {
        try {
            for (let i = 0; i < userIdArray.length; i++) {
                await functions_1.PrismaClient.notification.create({
                    data: {
                        userId: userIdArray[i],
                        title: title,
                        body: body,
                        redirect_url: redirect_url,
                    },
                });
            }
            return (0, functions_1.successResponse)('Notification is sent successfully!');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async sendNotification(payload) {
        try {
            if (payload.user_id) {
                const response = await this.sendNotificationToOneUser(payload.user_id, payload.title, payload.body, payload.redirect_url);
                return response;
            }
            else {
                const roles = String(coreConstant_1.coreConstant.ROLES.STUDENT);
                const userList = await functions_1.PrismaClient.user.findMany({
                    where: {
                        roles: {
                            contains: roles,
                        },
                    },
                });
                const userIdArray = userList.map((follower) => follower.userId);
                const response = await this.sendNotificationToAllUser(userIdArray, payload.title, payload.body, payload.redirect_url);
                return response;
            }
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getMyNotificationList(user, payload) {
        try {
            const seen = payload === null || payload === void 0 ? void 0 : payload.seen;
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            const whereCondition = {
                userId: user.id,
            };
            const notificationList = await functions_1.PrismaClient.notification.findMany(Object.assign({ where: whereCondition, orderBy: {
                    created_at: 'desc',
                } }, paginate));
            if (Number(seen) === 1) {
                notificationList.map((notification) => {
                    functions_1.PrismaClient.notification.update({
                        where: {
                            id: notification.id,
                        },
                        data: {
                            is_seen: 1,
                        },
                    });
                });
            }
            const data = {
                list: notificationList,
                meta: await (0, functions_1.paginationMetaData)(notificationList, payload, whereCondition),
            };
            return (0, functions_1.successResponse)('Notification list of user', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getNotificationDetails(user, id) {
        try {
            const notificationDetails = await functions_1.PrismaClient.notification.findFirst({
                where: {
                    id: id,
                    userId: user.id,
                },
            });
            if (!notificationDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            if (notificationDetails.is_seen === coreConstant_1.SeenUnseenStatusConstant.UNSEEN) {
                await functions_1.PrismaClient.notification.update({
                    where: {
                        id: notificationDetails.id,
                    },
                    data: {
                        is_seen: coreConstant_1.SeenUnseenStatusConstant.SEEN,
                    },
                });
            }
            return (0, functions_1.successResponse)('Notification details', notificationDetails);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
};
NotificationService = __decorate([
    (0, common_1.Injectable)()
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map