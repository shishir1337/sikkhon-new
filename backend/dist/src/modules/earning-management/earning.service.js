"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EarningService = void 0;
const common_1 = require("@nestjs/common");
const functions_1 = require("../../shared/helpers/functions");
const runtime_1 = require("@prisma/client/runtime");
const coreConstant_1 = require("../../shared/helpers/coreConstant");
let EarningService = class EarningService {
    async paymentWithdrawRequest(user, payload) {
        try {
            const walletDetails = await functions_1.PrismaClient.wallet.findFirst({
                where: {
                    userId: user.id,
                },
            });
            if (!walletDetails) {
                return (0, functions_1.errorResponse)('Invalid wallet!');
            }
            const adminUserDetails = await functions_1.PrismaClient.user.findFirst({
                where: {
                    roles: {
                        contains: '2',
                    },
                },
            });
            const adminWallet = await functions_1.PrismaClient.wallet.findFirst({
                where: {
                    userId: adminUserDetails.id,
                    is_admin_wallet: true,
                },
            });
            if (!adminWallet) {
                return (0, functions_1.errorResponse)('Invalid Admin wallet!');
            }
            const withdrawPercentage = await (0, functions_1.adminSettingsValueBySlug)('withdraw_percentage');
            let adminFeeAmount = 0;
            if (withdrawPercentage) {
                adminFeeAmount =
                    (Number(withdrawPercentage) * payload.requested_amount) / 100;
            }
            const requestedAmountDecimal = new runtime_1.Decimal(payload.requested_amount);
            const adminFeeAmountDecimal = new runtime_1.Decimal(adminFeeAmount);
            const totalAmount = requestedAmountDecimal.add(adminFeeAmountDecimal);
            if (Number(walletDetails.balance) < Number(totalAmount)) {
                return (0, functions_1.errorResponse)('You have no sufficent to withdraw!');
            }
            await functions_1.PrismaClient.withdrawTransaction.create({
                data: {
                    userId: user.id,
                    walletId: walletDetails.id,
                    requested_amount: payload.requested_amount,
                    requested_payment_details: payload.requested_payment_details,
                    admin_fee_amount: adminFeeAmountDecimal,
                },
            });
            await functions_1.PrismaClient.wallet.updateMany({
                where: {
                    userId: user.id,
                },
                data: {
                    balance: {
                        decrement: payload.requested_amount + adminFeeAmount,
                    },
                    total_pending_withdraw: {
                        increment: payload.requested_amount,
                    },
                    admin_earning: {
                        increment: adminFeeAmount,
                    },
                },
            });
            await functions_1.PrismaClient.wallet.update({
                where: {
                    id: adminWallet.id,
                },
                data: {
                    balance: {
                        decrement: payload.requested_amount + adminFeeAmount,
                    },
                    total_pending_withdraw: {
                        increment: payload.requested_amount,
                    },
                },
            });
            return (0, functions_1.successResponse)('Withdraw request is submitted successfully!');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getWithdrawListForInstructor(user, payload) {
        try {
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            const whereCondition = {
                userId: user.id,
            };
            const withdrawList = await functions_1.PrismaClient.withdrawTransaction.findMany(Object.assign({ where: whereCondition, orderBy: {
                    created_at: 'desc',
                } }, paginate));
            const paginationMeta = await (0, functions_1.paginationMetaData)('withdrawTransaction', payload, whereCondition);
            const data = {
                list: withdrawList,
                meta: paginationMeta,
            };
            return (0, functions_1.successResponse)('Withdraw list', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getWithdrawEarningForAdmin(payload) {
        try {
            const adminUserDetails = await functions_1.PrismaClient.user.findFirst({
                where: {
                    roles: {
                        contains: '2',
                    },
                },
            });
            const adminWallet = await functions_1.PrismaClient.wallet.findFirst({
                where: {
                    userId: adminUserDetails.id,
                    is_admin_wallet: true,
                },
            });
            if (!adminWallet) {
                return (0, functions_1.errorResponse)('Invalid Admin wallet!');
            }
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            const withdrawList = await functions_1.PrismaClient.withdrawTransaction.findMany(Object.assign({ include: {
                    User: {
                        select: {
                            id: true,
                            email: true,
                            first_name: true,
                            last_name: true,
                            user_name: true,
                            phone: true,
                            photo: true,
                        },
                    },
                }, orderBy: {
                    created_at: 'desc',
                } }, paginate));
            withdrawList.map((withdrawDetails) => {
                withdrawDetails.payment_accepted_document =
                    withdrawDetails.payment_accepted_document
                        ? (0, functions_1.addPhotoPrefix)(withdrawDetails.payment_accepted_document)
                        : withdrawDetails.payment_accepted_document;
                withdrawDetails.User.photo = withdrawDetails.User.photo
                    ? (0, functions_1.addPhotoPrefix)(withdrawDetails.User.photo)
                    : withdrawDetails.User.photo;
            });
            const paginationMeta = await (0, functions_1.paginationMetaData)('withdrawTransaction', payload);
            const data = {
                admin_wallet_details: adminWallet,
                list: withdrawList,
                meta: paginationMeta,
            };
            return (0, functions_1.successResponse)('Withdraw list', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async updateWithdrawRequest(payload, file) {
        try {
            const status = Number(payload.status);
            const withdraw_transaction_id = Number(payload.withdraw_transaction_id);
            const instructor_id = Number(payload.instructor_id);
            const withdrawTransaction = await functions_1.PrismaClient.withdrawTransaction.findFirst({
                where: {
                    id: withdraw_transaction_id,
                },
            });
            if (!withdrawTransaction) {
                return (0, functions_1.errorResponse)('Invalid request!');
            }
            if (withdrawTransaction.status !== coreConstant_1.WithdrawStatusConstant.PENDING) {
                return (0, functions_1.errorResponse)('Invalid request, this status already has been changed in previous!');
            }
            const adminUserDetails = await functions_1.PrismaClient.user.findFirst({
                where: {
                    roles: {
                        contains: '2',
                    },
                },
            });
            const adminWallet = await functions_1.PrismaClient.wallet.findFirst({
                where: {
                    userId: adminUserDetails.id,
                    is_admin_wallet: true,
                },
            });
            if (!adminWallet) {
                return (0, functions_1.errorResponse)('Invalid Admin wallet!');
            }
            const instructorWallet = await functions_1.PrismaClient.wallet.findFirst({
                where: {
                    userId: instructor_id,
                },
            });
            if (!instructorWallet) {
                return (0, functions_1.errorResponse)('Invalid Instructor wallet!');
            }
            const requested_amount = withdrawTransaction.requested_amount;
            const admin_fee_amount = withdrawTransaction.admin_fee_amount;
            const totalAmount = requested_amount.add(admin_fee_amount);
            if (status === coreConstant_1.WithdrawStatusConstant.ACCEPTED) {
                await functions_1.PrismaClient.wallet.update({
                    where: {
                        id: adminWallet.id,
                    },
                    data: {
                        total_pending_withdraw: {
                            decrement: requested_amount,
                        },
                        total_withdrawn_amount: {
                            increment: requested_amount,
                        },
                        admin_earning: {
                            increment: admin_fee_amount,
                        },
                    },
                });
                await functions_1.PrismaClient.wallet.update({
                    where: {
                        id: instructorWallet.id,
                    },
                    data: {
                        total_pending_withdraw: {
                            decrement: requested_amount,
                        },
                        total_withdrawn_amount: {
                            increment: requested_amount,
                        },
                    },
                });
                await functions_1.PrismaClient.withdrawTransaction.update({
                    where: {
                        id: withdrawTransaction.id,
                    },
                    data: {
                        status: coreConstant_1.WithdrawStatusConstant.ACCEPTED,
                        payment_accepted_document: file ? `/${file.path}` : null,
                    },
                });
                return (0, functions_1.successResponse)('Withdraw request is accepted successfully!');
            }
            if (status === coreConstant_1.WithdrawStatusConstant.REJECTED) {
                await functions_1.PrismaClient.wallet.update({
                    where: {
                        id: adminWallet.id,
                    },
                    data: {
                        balance: {
                            increment: totalAmount,
                        },
                        total_pending_withdraw: {
                            decrement: requested_amount,
                        },
                    },
                });
                await functions_1.PrismaClient.wallet.update({
                    where: {
                        id: instructorWallet.id,
                    },
                    data: {
                        balance: {
                            increment: totalAmount,
                        },
                        total_pending_withdraw: {
                            decrement: requested_amount,
                        },
                        admin_earning: {
                            decrement: admin_fee_amount,
                        },
                    },
                });
                await functions_1.PrismaClient.withdrawTransaction.update({
                    where: {
                        id: withdrawTransaction.id,
                    },
                    data: {
                        status: coreConstant_1.WithdrawStatusConstant.REJECTED,
                    },
                });
                return (0, functions_1.successResponse)('Withdraw request is rejected successfully!');
            }
            return (0, functions_1.errorResponse)('Invalid Request');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getWithdrawAdminFee(user, payload) {
        try {
            const walletDetails = await functions_1.PrismaClient.wallet.findFirst({
                where: {
                    userId: user.id,
                },
            });
            if (!walletDetails) {
                return (0, functions_1.errorResponse)('Invalid wallet!');
            }
            const withdrawPercentage = await (0, functions_1.adminSettingsValueBySlug)('withdraw_percentage');
            let adminFeeAmount = 0;
            if (withdrawPercentage) {
                adminFeeAmount =
                    (Number(withdrawPercentage) * payload.requested_amount) / 100;
            }
            const data = {
                admin_fee: adminFeeAmount,
            };
            return (0, functions_1.successResponse)('Withdraw admin fee', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getInstructorSelfEarningDetails(user, payload) {
        try {
            const walletDetails = await functions_1.PrismaClient.wallet.findFirst({
                where: {
                    userId: user.id,
                },
            });
            if (!walletDetails) {
                return (0, functions_1.errorResponse)('Wallet Not Found!');
            }
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            const whereCondition = {
                userId: user.id,
            };
            const withdrawList = await functions_1.PrismaClient.withdrawTransaction.findMany(Object.assign({ where: whereCondition, orderBy: {
                    created_at: 'desc',
                } }, paginate));
            withdrawList.map((withdraw) => {
                withdraw.payment_accepted_document = withdraw.payment_accepted_document
                    ? (0, functions_1.addPhotoPrefix)(withdraw.payment_accepted_document)
                    : withdraw.payment_accepted_document;
            });
            const data = {
                wallet_details: walletDetails,
                withdraw_list: withdrawList,
                meta: await (0, functions_1.paginationMetaData)('withdrawTransaction', payload, whereCondition),
            };
            return (0, functions_1.successResponse)('Instructor wallet details', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getInstructorWalletList(payload) {
        try {
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            const roles = String(coreConstant_1.coreConstant.ROLES.INSTRUCTOR);
            const whereCondition = {
                roles: {
                    contains: roles,
                },
            };
            const instructorList = await functions_1.PrismaClient.user.findMany({
                where: {
                    roles: {
                        contains: roles,
                    },
                },
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true,
                    Wallet: true,
                },
            });
            const data = {
                instructor_list: instructorList,
                meta: await (0, functions_1.paginationMetaData)('user', payload, whereCondition),
            };
            return (0, functions_1.successResponse)('Instructor list with wallet', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
};
EarningService = __decorate([
    (0, common_1.Injectable)()
], EarningService);
exports.EarningService = EarningService;
//# sourceMappingURL=earning.service.js.map