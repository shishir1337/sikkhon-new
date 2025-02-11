"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const functions_1 = require("../../../shared/helpers/functions");
const coreConstant_1 = require("../../../shared/helpers/coreConstant");
const array_constants_1 = require("../../../shared/constants/array.constants");
const response_model_1 = require("../../../shared/models/response.model");
let AdminService = class AdminService {
    async createNewUser(payload) {
        try {
            const checkEmailNickName = await (0, functions_1.CheckEmailNickName)(payload.email, payload.nick_name);
            if (!checkEmailNickName.success) {
                return checkEmailNickName;
            }
            let file_url = null;
            if (payload.file_id) {
                const fileDetails = await functions_1.PrismaClient.myUploads.findFirst({
                    where: {
                        id: payload.file_id,
                    },
                });
                if (!fileDetails) {
                    return (0, functions_1.errorResponse)('Invalid image request!');
                }
                file_url = fileDetails.file_path;
            }
            const hashPassword = await (0, functions_1.hashedPassword)(payload.password);
            const rolesToCheck = payload.roles.split(',').map((role) => Number(role)) || [];
            const resultOfRole = rolesToCheck.every((role) => array_constants_1.UserRolesArray.includes(role));
            if (!resultOfRole) {
                return (0, functions_1.errorResponse)('Invalid Roles!');
            }
            const newUserDetails = await functions_1.PrismaClient.user.create({
                data: {
                    first_name: payload.first_name,
                    last_name: payload.last_name,
                    user_name: payload.nick_name,
                    phone: payload.phone,
                    photo: file_url,
                    country: payload.country,
                    birth_date: payload.birth_date,
                    roles: payload.roles,
                    status: payload.status,
                    gender: payload.gender,
                    email: payload.email,
                    password: hashPassword,
                },
            });
            return (0, functions_1.successResponse)('New user is created successfully!', newUserDetails);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async createNewAdmin(payload) {
        try {
            const checkEmailNickName = await (0, functions_1.CheckEmailNickName)(payload.email, payload.nick_name);
            if (!checkEmailNickName.success) {
                return checkEmailNickName;
            }
            let file_url = null;
            if (payload.file_id) {
                const fileDetails = await functions_1.PrismaClient.myUploads.findFirst({
                    where: {
                        id: payload.file_id,
                    },
                });
                if (!fileDetails) {
                    return (0, functions_1.errorResponse)('Invalid image request!');
                }
                file_url = fileDetails.file_path;
            }
            const hashPassword = await (0, functions_1.hashedPassword)(payload.password);
            const rolesToCheck = payload.roles.split(',').map((role) => Number(role)) || [];
            const resultOfRole = rolesToCheck.every((role) => array_constants_1.AdminRolesArray.includes(role));
            if (!resultOfRole) {
                return (0, functions_1.errorResponse)('Invalid Roles!');
            }
            const newUserDetails = await functions_1.PrismaClient.user.create({
                data: {
                    first_name: payload.first_name,
                    last_name: payload.last_name,
                    user_name: payload.nick_name,
                    phone: payload.phone,
                    photo: file_url,
                    country: payload.country,
                    birth_date: payload.birth_date,
                    roles: payload.roles,
                    status: payload.status,
                    gender: payload.gender,
                    email: payload.email,
                    password: hashPassword,
                },
            });
            return (0, functions_1.successResponse)('New Admin is created successfully!', newUserDetails);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getStudentList(payload) {
        try {
            const roles = String(coreConstant_1.coreConstant.ROLES.STUDENT);
            const responseOfUserList = await this.listOfUserDefineRoleWithQuery(roles, payload);
            if (!responseOfUserList.success) {
                return responseOfUserList;
            }
            const responseData = responseOfUserList.data;
            const data = {
                total_student: responseData.total,
                total_active_student: responseData.total_active,
                totalInActiveStudent: responseData.total_inactive,
                list: responseData.list,
                meta: responseData.meta,
            };
            return (0, functions_1.successResponse)('Student list!', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getInstructorList(payload) {
        try {
            const roles = String(coreConstant_1.coreConstant.ROLES.INSTRUCTOR);
            const responseOfUserList = await this.listOfUserDefineRoleWithQuery(roles, payload);
            if (!responseOfUserList.success) {
                return responseOfUserList;
            }
            const responseData = responseOfUserList.data;
            const data = {
                total_instructor: responseData.total,
                total_active_instructor: responseData.total_active,
                total_inactive_instructor: responseData.total_inactive,
                list: responseData.list,
                meta: responseData.meta,
            };
            return (0, functions_1.successResponse)('Instructor list!', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getInstructorListNoPagination() {
        try {
            const roles = String(coreConstant_1.coreConstant.ROLES.INSTRUCTOR);
            const instructors = await functions_1.PrismaClient.user.findMany({
                where: {
                    roles: {
                        contains: roles,
                    },
                },
            });
            if (!instructors) {
                return (0, functions_1.errorResponse)('Instructor not found!');
            }
            const userListWithoutPassword = await (0, functions_1.removePasswordFromUserList)(instructors);
            return (0, functions_1.successResponse)('Instructor list!', userListWithoutPassword);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getAdminDashboardInfo() {
        var _a, _b, _c;
        try {
            const totalUsers = await functions_1.PrismaClient.user.count();
            const totalCourses = await functions_1.PrismaClient.course.count();
            const totalEnrollments = await functions_1.PrismaClient.courseEnrollment.count();
            const totalInstructors = await functions_1.PrismaClient.user.count({
                where: {
                    roles: {
                        contains: String(coreConstant_1.coreConstant.ROLES.INSTRUCTOR),
                    },
                },
            });
            const adminWallet = await functions_1.PrismaClient.wallet.findFirst({
                where: {
                    is_admin_wallet: true,
                },
            });
            const totalStudents = await functions_1.PrismaClient.user.count({
                where: {
                    roles: {
                        contains: String(coreConstant_1.coreConstant.ROLES.STUDENT),
                    },
                },
            });
            const latestCourses = await functions_1.PrismaClient.course.findMany({
                take: 5,
                orderBy: {
                    created_at: 'desc',
                },
            });
            const formattedLatestCourses = latestCourses.map((course) => {
                var _a;
                return (Object.assign(Object.assign({}, course), { thumbnail_link: ((_a = course.thumbnail_link) === null || _a === void 0 ? void 0 : _a.startsWith('http'))
                        ? course.thumbnail_link
                        : (0, functions_1.addPhotoPrefix)(course.thumbnail_link) }));
            });
            const withdrawTransactions = await functions_1.PrismaClient.withdrawTransaction.findMany({
                where: {
                    created_at: {
                        gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
                    },
                },
                orderBy: {
                    created_at: 'asc',
                },
            });
            const withdrawTransactionschartData = withdrawTransactions.reduce((data, transaction) => {
                const date = transaction.created_at.toISOString().split('T')[0];
                data.dates.push(date);
                data.totalRequestedAmount.push(transaction.requested_amount);
                data.totalAdminFeeAmount.push(transaction.admin_fee_amount);
                return data;
            }, { dates: [], totalRequestedAmount: [], totalAdminFeeAmount: [] });
            const aggregatedChartData = withdrawTransactionschartData.dates.reduce((result, date, index) => {
                if (result.lastDate === date) {
                    result.totalRequestedAmount[result.lastIndex] +=
                        withdrawTransactionschartData.totalRequestedAmount[index];
                    result.totalAdminFeeAmount[result.lastIndex] +=
                        withdrawTransactionschartData.totalAdminFeeAmount[index];
                }
                else {
                    result.dates.push(date);
                    result.totalRequestedAmount.push(withdrawTransactionschartData.totalRequestedAmount[index]);
                    result.totalAdminFeeAmount.push(withdrawTransactionschartData.totalAdminFeeAmount[index]);
                    result.lastDate = date;
                    result.lastIndex = result.dates.length - 1;
                }
                return result;
            }, {
                dates: [],
                totalRequestedAmount: [],
                totalAdminFeeAmount: [],
                lastDate: '',
                lastIndex: 0,
            });
            const userCounts = await functions_1.PrismaClient.user.aggregate({
                _count: {
                    email_verified: true,
                    phone_verified: true,
                },
                _sum: {
                    status: true,
                },
            });
            const userDataChartData = {
                labels: ['Email Verified', 'Phone Verified', 'Active Users'],
                datasets: [
                    {
                        name: 'Counts',
                        values: [
                            ((_a = userCounts._count) === null || _a === void 0 ? void 0 : _a.email_verified) || 0,
                            ((_b = userCounts._count) === null || _b === void 0 ? void 0 : _b.phone_verified) || 0,
                            ((_c = userCounts._sum) === null || _c === void 0 ? void 0 : _c.status) || 0,
                        ],
                    },
                ],
            };
            const chartData = {
                labels: aggregatedChartData.dates,
                datasets: [
                    {
                        name: 'Total Requested Amount',
                        values: aggregatedChartData.totalRequestedAmount,
                    },
                    {
                        name: 'Total Admin Fee Amount',
                        values: aggregatedChartData.totalAdminFeeAmount,
                    },
                ],
            };
            const currentDate = new Date();
            const last12MonthsData = [];
            for (let i = 11; i >= 0; i--) {
                const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
                const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 0);
                const newUsersThisMonth = await functions_1.PrismaClient.user.count({
                    where: {
                        created_at: {
                            gte: startOfMonth,
                            lte: endOfMonth,
                        },
                    },
                });
                last12MonthsData.push(newUsersThisMonth);
            }
            const newUserDataChartData = {
                labels: Array.from({ length: 12 }, (_, i) => {
                    const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
                    return monthDate.toLocaleString('default', { month: 'short' });
                }).reverse(),
                datasets: [
                    {
                        name: 'New Users',
                        values: last12MonthsData.reverse(),
                    },
                ],
            };
            const totalTransactions = await functions_1.PrismaClient.cartEnrollment.aggregate({
                _sum: {
                    payable_price: true,
                },
            });
            const data = {
                totalUsers,
                totalCourses,
                totalEnrollments,
                totalInstructors,
                latestCourses: formattedLatestCourses,
                totalStudents,
                balance: (adminWallet === null || adminWallet === void 0 ? void 0 : adminWallet.balance) || 0,
                admin_earning: (adminWallet === null || adminWallet === void 0 ? void 0 : adminWallet.admin_earning) || 0,
                total_pending_withdraw: (adminWallet === null || adminWallet === void 0 ? void 0 : adminWallet.total_pending_withdraw) || 0,
                total_withdrawn_amount: (adminWallet === null || adminWallet === void 0 ? void 0 : adminWallet.total_withdrawn_amount) || 0,
                withdrawChartData: chartData,
                userDataChartData,
                newUserDataChartData,
                totalTransactions: totalTransactions._sum.payable_price,
            };
            return (0, functions_1.successResponse)('Admin Dashboard Info', data);
        }
        catch (error) {
            console.log(error, 'error');
            (0, functions_1.processException)(error);
        }
    }
    async getAdminList(payload) {
        try {
            const roles = String(coreConstant_1.coreConstant.ROLES.ADMIN) +
                ',' +
                String(coreConstant_1.coreConstant.ROLES.SUPER_ADMIN);
            const responseOfUserList = await this.listOfUserDefineRoleWithQuery(roles, payload);
            if (!responseOfUserList.success) {
                return responseOfUserList;
            }
            const responseData = responseOfUserList.data;
            const data = {
                total_admin: responseData.total,
                total_active_admin: responseData.total_active,
                total_inactive_admin: responseData.total_inactive,
                list: responseData.list,
                meta: responseData.meta,
            };
            return (0, functions_1.successResponse)('Admin list!', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async listOfUserDefineRoleWithQuery(roles, payload) {
        try {
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            const whereCondition = Object.assign({ roles: {
                    contains: roles,
                } }, (payload.search
                ? {
                    OR: [
                        {
                            first_name: {
                                contains: payload.search,
                            },
                        },
                        {
                            last_name: {
                                contains: payload.search,
                            },
                        },
                        {
                            email: {
                                contains: payload.search,
                            },
                        },
                        {
                            user_name: {
                                contains: payload.search,
                            },
                        },
                        {
                            phone: {
                                contains: payload.search,
                            },
                        },
                    ],
                }
                : {}));
            const userList = await functions_1.PrismaClient.user.findMany(Object.assign({ where: whereCondition }, paginate));
            const userListWithoutPassword = await (0, functions_1.removePasswordFromUserList)(userList);
            const total = await functions_1.PrismaClient.user.count({
                where: {
                    roles: {
                        contains: roles,
                    },
                },
            });
            const totalActive = await functions_1.PrismaClient.user.count({
                where: {
                    roles: {
                        contains: roles,
                    },
                    status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                },
            });
            const totalInActive = await functions_1.PrismaClient.user.count({
                where: {
                    roles: {
                        contains: roles,
                    },
                    status: coreConstant_1.coreConstant.STATUS_INACTIVE,
                },
            });
            const data = {
                total: total,
                total_active: totalActive,
                total_inactive: totalInActive,
                list: userListWithoutPassword,
                meta: await (0, functions_1.paginationMetaData)('user', payload, whereCondition),
            };
            return (0, functions_1.successResponse)('User list!', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)()
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map