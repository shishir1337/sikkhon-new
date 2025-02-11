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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const functions_1 = require("../../../shared/helpers/functions");
const prisma_service_1 = require("../../prisma/prisma.service");
const coreConstant_1 = require("../../../shared/helpers/coreConstant");
const user_verify_code_service_1 = require("../../verification_code/user-verify-code.service");
const response_model_1 = require("../../../shared/models/response.model");
const crypto_1 = require("crypto");
const bcrypt_1 = require("bcrypt");
const mailer_service_1 = require("../../../shared/mail/mailer.service");
let UsersService = class UsersService {
    constructor(prisma, userCodeService, mailService) {
        this.prisma = prisma;
        this.userCodeService = userCodeService;
        this.mailService = mailService;
    }
    async getInstructirDashboardInfo(user) {
        var _a, _b;
        try {
            const instructor_wallet = await functions_1.PrismaClient.wallet.findFirst({
                where: {
                    userId: user.id,
                },
            });
            const userInfo = await functions_1.PrismaClient.user.findUnique({
                where: {
                    id: user.id,
                },
                include: {
                    Review: true,
                    Course: {
                        orderBy: {
                            created_at: 'desc',
                        },
                        include: {
                            CourseEnrollment: true,
                        },
                    },
                },
            });
            const enrolledStudents = await functions_1.PrismaClient.courseEnrollment.findMany({
                where: {
                    course: {
                        instructorId: user.id,
                    },
                },
                include: {
                    user: true,
                },
            });
            const uniqueUserIds = new Set();
            const formattedStudents = enrolledStudents.reduce((result, enrollment) => {
                const { id } = enrollment.user;
                if (!uniqueUserIds.has(id)) {
                    uniqueUserIds.add(id);
                    const _a = enrollment.user, { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
                    const formattedStudent = {
                        user: Object.assign(Object.assign({}, userWithoutPassword), { photo: (0, functions_1.addPhotoPrefix)(enrollment.user.photo) }),
                        created_at: enrollment.created_at,
                    };
                    result.push(formattedStudent);
                }
                return result;
            }, []);
            let review_count = userInfo.Review.length;
            let data = {};
            let last_courses = [];
            (_b = (_a = userInfo === null || userInfo === void 0 ? void 0 : userInfo.Course) === null || _a === void 0 ? void 0 : _a.slice(0, 5)) === null || _b === void 0 ? void 0 : _b.forEach((item) => {
                var _a;
                let local = Object.assign({}, item);
                local.thumbnail_link = ((_a = local.thumbnail_link) === null || _a === void 0 ? void 0 : _a.startsWith('http'))
                    ? local.thumbnail_link
                    : (0, functions_1.addPhotoPrefix)(local.thumbnail_link);
                last_courses.push(local);
            });
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 30);
            const enrollments = await functions_1.PrismaClient.courseEnrollment.findMany({
                where: {
                    course: {
                        instructorId: user.id,
                    },
                    created_at: {
                        gte: startDate,
                    },
                },
                orderBy: {
                    created_at: 'asc',
                },
            });
            const enrollmentData = enrollments.reduce((data, enrollment) => {
                const date = enrollment.created_at.toISOString().split('T')[0];
                if (!data[date]) {
                    data[date] = 1;
                }
                else {
                    data[date]++;
                }
                return data;
            }, {});
            const dates = Object.keys(enrollmentData).sort();
            const counts = dates.map((date) => enrollmentData[date]);
            const enrollmentChart = {
                labels: dates,
                datasets: [
                    {
                        name: 'Enrollments',
                        values: counts,
                    },
                ],
            };
            data['review_count'] = review_count;
            data['reviews'] = userInfo.Review;
            data['students'] = formattedStudents.length;
            data['students_data'] = formattedStudents.slice(0, 5);
            data['courses'] = userInfo.Course.length;
            data['last_courses'] = last_courses;
            data['instructor_wallet'] = instructor_wallet ? instructor_wallet : null;
            data['enrollmentChart'] = enrollmentChart;
            return (0, functions_1.successResponse)('Dashboard Info', data);
        }
        catch (error) {
            console.log(error, 'error');
            (0, functions_1.processException)(error);
        }
    }
    async getProfile(user) {
        if (!user) {
            return (0, functions_1.errorResponse)('Please login inorder to get profile data');
        }
        const userProfile = await functions_1.PrismaClient.user.findUnique({
            where: { id: user.id },
            include: {
                Course: {
                    where: {
                        status: coreConstant_1.coreConstant.ACTIVE,
                    },
                },
            },
        });
        delete userProfile.password;
        if (userProfile.photo) {
            userProfile.photo = (0, functions_1.addPhotoPrefix)(userProfile.photo);
        }
        const data = {
            user: userProfile,
            user_roles: await (0, functions_1.userRolesPermissionObject)(userProfile.roles),
        };
        return (0, functions_1.successResponse)('Response successfully', data);
    }
    async checkEmailNickName(email, nickName) {
        const checkUniqueEmail = await this.prisma.user.findUnique({
            where: { email: email },
        });
        if (checkUniqueEmail) {
            return (0, functions_1.errorResponse)('Email already exists', []);
        }
        const checkUniqueNickName = await this.prisma.user.findUnique({
            where: { user_name: nickName },
        });
        if (checkUniqueNickName) {
            return (0, functions_1.errorResponse)('Nickname already exists', []);
        }
        return (0, functions_1.successResponse)('success', []);
    }
    async create(payload) {
        try {
            const checkUniqueEmail = await this.checkEmailNickName(payload.email, payload.user_name);
            if (checkUniqueEmail.success == false) {
                return checkUniqueEmail;
            }
            const hashPassword = await (0, functions_1.hashedPassword)(coreConstant_1.coreConstant.COMMON_PASSWORD);
            const lowerCaseEmail = payload.email.toLowerCase();
            const data = Object.assign(Object.assign({}, payload), { email: lowerCaseEmail, password: hashPassword });
            const user = await this.createNewUser(data);
            if (user.success == true) {
                return (0, functions_1.successResponse)('New user created successful', user.data);
            }
            else {
                return user;
            }
        }
        catch (err) {
            console.log(err);
        }
        return (0, functions_1.errorResponse)('Something went wrong', []);
    }
    async createNewUser(payload, sendMail = true) {
        try {
            const user = await this.prisma.user.create({
                data: Object.assign(Object.assign({}, payload), { unique_code: (0, functions_1.createUniqueCode)() }),
            });
            if (user && sendMail) {
                const mailKey = (0, functions_1.generateMailKey)();
                const codeData = {
                    user_id: user.id,
                    code: mailKey,
                    type: coreConstant_1.coreConstant.VERIFICATION_TYPE_EMAIL,
                };
                await this.userCodeService.createUserCode(codeData);
                const mailData = {
                    verification_code: mailKey,
                };
                await this.userCodeService.createUserCode(codeData);
                const mailResponse = await this.mailService.sendMail(user.email, 'New Registration', 'otp-email.hbs', {
                    name: user.first_name + ' ' + user.last_name,
                    verification_code: mailKey,
                });
                if (mailResponse.success) {
                    return (0, functions_1.successResponse)('Registration successful, please, check your mail to verify your mail', user);
                }
                return (0, functions_1.successResponse)('New user created successfully', user);
            }
            return (0, functions_1.successResponse)('New user created successfully', user);
        }
        catch (err) {
            console.log(err);
        }
        return (0, functions_1.errorResponse)('Something went wrong', []);
    }
    async findByEmail(email) {
        const lowerCaseEmail = email.toLowerCase();
        return this.prisma.user.findUnique({ where: { email: lowerCaseEmail } });
    }
    async findById(id) {
        return this.prisma.user.findUnique({ where: { id: id } });
    }
    async userList(payload) {
        try {
            const search = payload.search ? payload.search : '';
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            const whereCondition = {
                OR: [
                    {
                        email: {
                            contains: search,
                        },
                    },
                    {
                        first_name: {
                            contains: search,
                        },
                    },
                    {
                        last_name: {
                            contains: search,
                        },
                    },
                    {
                        user_name: {
                            contains: search,
                        },
                    },
                ],
            };
            const userList = await this.prisma.user.findMany(Object.assign({ where: whereCondition, orderBy: {
                    created_at: 'desc',
                } }, paginate));
            const userListWithoutPassword = userList.map((user) => {
                const { password } = user, userWithoutPassword = __rest(user, ["password"]);
                return userWithoutPassword;
            });
            const paginationMeta = userListWithoutPassword.length > 0
                ? await (0, functions_1.paginationMetaData)('user', payload, whereCondition)
                : coreConstant_1.DefaultPaginationMetaData;
            const data = {
                list: userListWithoutPassword,
                meta: paginationMeta,
            };
            return (0, functions_1.successResponse)('User List', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async statusChangeUser(payload) {
        try {
            const userDetails = await this.prisma.user.findFirst({
                where: {
                    id: payload.user_id,
                },
            });
            if (!userDetails) {
                return (0, functions_1.errorResponse)('Invalid request!');
            }
            if (payload.status_type === 2 && !userDetails.email) {
                return (0, functions_1.errorResponse)('Email is not provided by user!');
            }
            if (payload.status_type === 3 && !userDetails.phone) {
                return (0, functions_1.errorResponse)('Phone number is not provided by user!');
            }
            const data = payload.status_type == 1
                ? {
                    status: userDetails.status == coreConstant_1.coreConstant.ACTIVE
                        ? coreConstant_1.coreConstant.INACTIVE
                        : coreConstant_1.coreConstant.ACTIVE,
                }
                : payload.status_type == 2
                    ? {
                        email_verified: userDetails.email_verified == coreConstant_1.coreConstant.ACTIVE
                            ? coreConstant_1.coreConstant.INACTIVE
                            : coreConstant_1.coreConstant.ACTIVE,
                    }
                    : payload.status_type == 3
                        ? {
                            phone_verified: userDetails.phone_verified == coreConstant_1.coreConstant.ACTIVE
                                ? coreConstant_1.coreConstant.INACTIVE
                                : coreConstant_1.coreConstant.ACTIVE,
                        }
                        : {};
            await this.prisma.user.update({
                where: {
                    id: userDetails.id,
                },
                data: data,
            });
            return (0, functions_1.successResponse)('Status is changed successfully!');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async createUserCode(payload) {
        try {
            const checkExists = await this.prisma.userVerificationCodes.findMany({
                where: {
                    user_id: payload.user_id,
                    type: payload.type,
                },
            });
            if (checkExists.length > 0) {
                await this.prisma.userVerificationCodes.deleteMany({
                    where: {
                        user_id: payload.user_id,
                        type: payload.type,
                    },
                });
            }
            const createData = await this.prisma.userVerificationCodes.create({
                data: {
                    user_id: payload.user_id,
                    code: payload.code.toString(),
                    type: payload.type,
                    status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                    expired_at: (0, functions_1.addDayWithCurrentDate)(5),
                },
            });
            return (0, functions_1.successResponse)('Success', createData);
        }
        catch (err) {
            return (0, functions_1.errorResponse)('Something went wrong');
        }
    }
    async sendForgotPasswordEmailProcess(email) {
        try {
            const user = await this.findByEmail(email);
            if (user) {
                const mailKey = (0, functions_1.generateMailKey)();
                const codeData = {
                    user_id: user.id,
                    code: mailKey,
                    type: coreConstant_1.coreConstant.VERIFICATION_TYPE_EMAIL,
                };
                await this.createUserCode(codeData);
                const mailData = {
                    verification_code: mailKey,
                };
                const mailResponse = await this.mailService.sendMail(user.email, 'Password Reset', 'reset-password.hbs', {
                    name: user.first_name + ' ' + user.last_name,
                    verification_code: mailKey,
                });
                if (mailResponse.success) {
                    return (0, functions_1.successResponse)(mailResponse.message);
                }
                else {
                    return (0, functions_1.errorResponse)(mailResponse.message);
                }
            }
            else {
                return (0, functions_1.successResponse)('User not found', []);
            }
        }
        catch (err) {
            console.log(err);
        }
        return (0, functions_1.errorResponse)('Something went wrong');
    }
    async updateProfile(user, payload) {
        try {
            const exist = await this.prisma.user.findFirst({
                where: {
                    email: {
                        not: {
                            equals: user.email,
                        },
                    },
                    user_name: payload.user_name,
                },
            });
            if (exist) {
                return (0, functions_1.errorResponse)('Username has been already taken!');
            }
            let image_url = null;
            if (payload.file_id) {
                const fileDetails = await this.prisma.myUploads.findFirst({
                    where: {
                        id: payload.file_id,
                    },
                });
                if (!fileDetails) {
                    return (0, functions_1.errorResponse)('Invalid image request!');
                }
                image_url = fileDetails.file_path;
            }
            const updatedUser = await this.prisma.user.update({
                where: {
                    email: user.email,
                },
                data: {
                    first_name: payload.first_name,
                    last_name: payload.last_name,
                    user_name: payload.user_name,
                    phone: payload.phone,
                    country: payload.country,
                    birth_date: new Date(payload.birth_date),
                    gender: Number(payload.gender),
                    photo: image_url ? image_url : user.photo,
                },
            });
            return (0, functions_1.successResponse)('Profile is updated successfully!', updatedUser);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async checkUserNameIsUnique(user, payload) {
        try {
            const checkUserNameExists = await this.prisma.user.findFirst({
                where: {
                    email: {
                        not: {
                            equals: user.email,
                        },
                    },
                    user_name: payload.user_name,
                },
            });
            if (checkUserNameExists) {
                return (0, functions_1.errorResponse)('This name has been already taken!');
            }
            else {
                return (0, functions_1.successResponse)('This name is unique!');
            }
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async becomeAnInstructor(user) {
        try {
            const userProfile = await functions_1.PrismaClient.user.findUnique({
                where: {
                    id: user.id,
                },
            });
            const userRoles = await (0, functions_1.userRolesPermissionObject)(userProfile.roles);
            if (!userRoles.is_instructor) {
                const existingApplication = await functions_1.PrismaClient.instructorApplication.findUnique({
                    where: {
                        userId: user.id,
                    },
                });
                if (existingApplication) {
                    const updatedApplication = await functions_1.PrismaClient.instructorApplication.update({
                        where: {
                            id: existingApplication.id,
                        },
                        data: {
                            status: coreConstant_1.coreConstant.STATUS_PENDING,
                        },
                    });
                    return (0, functions_1.successResponse)('Instructor application submitted successfully!', updatedApplication);
                }
                else {
                    const newApplication = await functions_1.PrismaClient.instructorApplication.create({
                        data: {
                            userId: user.id,
                            status: coreConstant_1.coreConstant.STATUS_PENDING,
                        },
                    });
                    return (0, functions_1.successResponse)('Instructor application submitted successfully!', newApplication);
                }
            }
            return (0, functions_1.successResponse)('Already an instructor', userProfile);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async assignInstructor(user_id) {
        try {
            const userProfile = await functions_1.PrismaClient.user.findUnique({
                where: {
                    id: user_id,
                },
            });
            if (!userProfile) {
                return (0, functions_1.errorResponse)('User not found');
            }
            const INSTRUCTOR = coreConstant_1.coreConstant.ROLES.INSTRUCTOR;
            const userRoles = await (0, functions_1.userRolesPermissionObject)(userProfile.roles);
            if (!userRoles.is_instructor) {
                const updatedUser = await functions_1.PrismaClient.user.update({
                    where: {
                        id: user_id,
                    },
                    data: {
                        roles: `${userProfile.roles},${INSTRUCTOR}`,
                    },
                });
                await functions_1.PrismaClient.instructorApplication.update({
                    where: {
                        userId: user_id,
                    },
                    data: {
                        status: coreConstant_1.coreConstant.ACTIVE,
                    },
                });
                return (0, functions_1.successResponse)('Assigned as an instructor!', updatedUser);
            }
            return (0, functions_1.successResponse)('Already an instructor', userProfile);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getPendingInstructorApplications(payload) {
        try {
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            let pendingApplications = await functions_1.PrismaClient.instructorApplication.findMany(Object.assign({ where: {
                    status: coreConstant_1.coreConstant.STATUS_PENDING,
                }, include: {
                    user: true,
                } }, paginate));
            const formattedPendings = pendingApplications.reduce((result, pending) => {
                const _a = pending.user, { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
                const formattedPending = Object.assign(Object.assign({}, pending), { user: Object.assign(Object.assign({}, userWithoutPassword), { photo: pending.user.photo
                            ? (0, functions_1.addPhotoPrefix)(pending.user.photo)
                            : '' }) });
                result.push(formattedPending);
                return result;
            }, []);
            const paginationMeta = await (0, functions_1.paginationMetaData)('instructorApplication', payload);
            const data = {
                list: formattedPendings,
                meta: paginationMeta,
            };
            return (0, functions_1.successResponse)('List of pending instructor applications', data);
        }
        catch (error) {
            console.log(error, 'error');
            (0, functions_1.processException)(error);
        }
    }
    async getInstructorApplicationStatus(user) {
        try {
            const applicationStatus = await functions_1.PrismaClient.instructorApplication.findFirst({
                where: {
                    userId: user.id,
                },
            });
            if (applicationStatus === null || applicationStatus === void 0 ? void 0 : applicationStatus.status) {
                return (0, functions_1.successResponse)('Instructor application status', {
                    status: applicationStatus.status,
                });
            }
            else {
                return (0, functions_1.successResponse)('No instructor application found for the user', null);
            }
        }
        catch (error) {
            console.log(error, 'errorerrorerror');
            (0, functions_1.processException)(error);
        }
    }
    async changeStatus(payload) {
        try {
            if (!payload.user_id) {
                return (0, functions_1.errorResponse)('User Id field is required!');
            }
            const user_id = Number(payload.user_id);
            const userDetails = await this.prisma.user.findFirst({
                where: {
                    id: user_id,
                },
            });
            if (userDetails) {
                const status = coreConstant_1.coreConstant.STATUS_ACTIVE == userDetails.status
                    ? coreConstant_1.coreConstant.STATUS_INACTIVE
                    : coreConstant_1.coreConstant.STATUS_ACTIVE;
                const updateUserDetails = await this.prisma.user.update({
                    where: {
                        id: Number(payload.user_id),
                    },
                    data: {
                        status: status,
                    },
                });
                delete updateUserDetails.password;
                return (0, functions_1.successResponse)('Status is updated successfully!', updateUserDetails);
            }
            else {
                return (0, functions_1.errorResponse)('User is not found!');
            }
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async userListByCountryWise() {
        try {
            const userList = await this.prisma.user.groupBy({
                by: ['country'],
                _count: true,
            });
            console.log(userList);
            return (0, functions_1.successResponse)('Country wise user list', userList);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async userProfileDetails(payload) {
        try {
            if (!payload.user_id) {
                return (0, functions_1.errorResponse)('User Id field is required!');
            }
            const user_id = Number(payload.user_id);
            const userDetails = await this.prisma.user.findFirst({
                where: {
                    id: user_id,
                },
            });
            if (userDetails) {
                delete userDetails.password;
                return (0, functions_1.successResponse)('User Details', userDetails);
            }
            else {
                return (0, functions_1.errorResponse)('User is not found!');
            }
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async updateEmail(user, payload) {
        try {
            if (!payload.email) {
                return (0, functions_1.errorResponse)('Email field is required!');
            }
            const checkEmailExists = await this.prisma.user.findFirst({
                where: {
                    email: {
                        not: {
                            equals: user.email,
                        },
                        equals: payload.email,
                    },
                },
            });
            if (checkEmailExists) {
                return (0, functions_1.errorResponse)('This email has been already taken!');
            }
            else {
                const userDetails = await this.prisma.user.update({
                    where: {
                        email: user.email,
                    },
                    data: {
                        email: payload.email,
                    },
                });
                delete userDetails.password;
                return (0, functions_1.successResponse)('Email is updated successfully!', userDetails);
            }
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async userRegistrationBySocialMedia(payload) {
        try {
            const userDetails = await this.prisma.user.findFirst({
                where: {
                    email: payload.email,
                },
            });
            if (userDetails) {
                return (0, functions_1.successResponse)('User is already registered!', userDetails);
            }
            else {
                const lowerCaseEmail = payload.email.toLocaleLowerCase();
                const hashPassword = await (0, functions_1.hashedPassword)((0, crypto_1.randomUUID)());
                const userRegistrationData = {
                    unique_code: (0, functions_1.createUniqueCode)(),
                    first_name: payload.first_name,
                    last_name: payload.last_name,
                    email: lowerCaseEmail,
                    password: hashPassword,
                    email_verified: coreConstant_1.coreConstant.IS_VERIFIED,
                    provider: payload.provider,
                    provider_id: payload.providerId,
                };
                const user = await this.prisma.user.create({
                    data: Object.assign({}, userRegistrationData),
                });
                return (0, functions_1.successResponse)('New user is registered successfully!', user);
            }
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async testTextGen(payload) {
        try {
            return (0, functions_1.successResponse)('Text is generated successfully!');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async changePassword(user, payload) {
        try {
            const userDetails = await this.prisma.user.findFirst({
                where: {
                    email: user.email,
                },
            });
            if (!userDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            const isPasswordValid = await (0, bcrypt_1.compare)(payload.current_password, userDetails.password);
            if (!isPasswordValid) {
                return (0, functions_1.errorResponse)('Your current password is not match!');
            }
            if (payload.password !== payload.confirm_password) {
                return (0, functions_1.errorResponse)('Password and confirm password do not match!');
            }
            const hashPassword = await (0, functions_1.hashedPassword)(payload.password);
            await this.prisma.user.update({
                where: {
                    id: userDetails.id,
                },
                data: {
                    password: hashPassword,
                },
            });
            return (0, functions_1.successResponse)('Password is changed successfully!');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_verify_code_service_1.UserVerificationCodeService,
        mailer_service_1.MailerService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map