"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveClassService = void 0;
const common_1 = require("@nestjs/common");
const functions_1 = require("../../shared/helpers/functions");
const coreConstant_1 = require("../../shared/helpers/coreConstant");
const array_constants_1 = require("../../shared/constants/array.constants");
const agora_access_token_1 = require("agora-access-token");
const response_model_1 = require("../../shared/models/response.model");
let LiveClassService = class LiveClassService {
    async createLiveClass(user, payload) {
        try {
            const checkCourse = await functions_1.PrismaClient.course.findUnique({
                where: { id: payload.course_id },
            });
            if (!checkCourse) {
                return (0, functions_1.successResponse)('Course not found!');
            }
            const liveClass = await functions_1.PrismaClient.liveClass.create({
                data: {
                    title: payload.title,
                    instructor_id: user.id,
                    courseId: payload.course_id,
                    channel_name: (0, functions_1.generateChannelName)(payload.title),
                    status: coreConstant_1.LiveCLassStatus.UPCOMING,
                    start_date_time: payload.start_date_time,
                },
            });
            return (0, functions_1.successResponse)('New live class is created successfully!', liveClass);
        }
        catch (error) {
            (0, functions_1.processException)(error);
            return (0, functions_1.errorResponse)('Failed to create live class.');
        }
    }
    async updateLiveClass(user, payload) {
        try {
            const existingLiveClass = await functions_1.PrismaClient.liveClass.findUnique({
                where: {
                    id: Number(payload.classId),
                },
            });
            if (!existingLiveClass) {
                return (0, functions_1.successResponse)('Live class not found!');
            }
            const currentDate = new Date();
            const startDate = new Date(payload.start_date_time);
            if (currentDate > startDate) {
                return (0, functions_1.successResponse)('Live class start date has already passed. Cannot update.');
            }
            const updatedLiveClass = await functions_1.PrismaClient.liveClass.update({
                where: {
                    id: Number(payload.classId),
                },
                data: {
                    title: payload.title,
                    instructor_id: user.id,
                    courseId: payload.course_id,
                    start_date_time: payload.start_date_time,
                },
            });
            return (0, functions_1.successResponse)('Live class updated successfully!', updatedLiveClass);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getLiveClassDetails(liveClassId) {
        try {
            const getLiveClass = await functions_1.PrismaClient.liveClass.findUnique({
                where: {
                    id: Number(liveClassId),
                },
                include: {
                    Course: true,
                    LiveClassInstructor: true,
                },
            });
            if (!getLiveClass) {
                return (0, functions_1.errorResponse)('Live class not found!');
            }
            return (0, functions_1.successResponse)('Live class details', getLiveClass);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getInstructorLiveClasses(user, payload) {
        try {
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            const liveClasses = await functions_1.PrismaClient.liveClass.findMany(Object.assign({ where: {
                    instructor_id: user.id,
                }, orderBy: {
                    created_at: 'desc',
                }, include: {
                    Course: true,
                } }, paginate));
            liveClasses.map((liveClass) => {
                var _a;
                liveClass.Course.thumbnail_link =
                    ((_a = liveClass.Course.thumbnail_link) === null || _a === void 0 ? void 0 : _a.startsWith('http'))
                        ? liveClass.Course.thumbnail_link
                        : (0, functions_1.addPhotoPrefix)(liveClass.Course.thumbnail_link);
            });
            const data = {
                list: liveClasses,
                meta: await (0, functions_1.paginationMetaData)('liveClass', payload),
            };
            return (0, functions_1.successResponse)('Live classes', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async deleteLiveClass(user, id) {
        try {
            const liveClass = await functions_1.PrismaClient.liveClass.findUnique({
                where: {
                    id: Number(id),
                },
            });
            if (!liveClass) {
                return (0, functions_1.successResponse)('Live class not found!');
            }
            await functions_1.PrismaClient.liveClass.delete({
                where: {
                    id: Number(id),
                },
            });
            return (0, functions_1.successResponse)('Live class deleted successfully!');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async liveClassCourseList(user) {
        try {
            const courses = await functions_1.PrismaClient.course.findMany({
                where: {
                    status: coreConstant_1.coreConstant.ACTIVE,
                    instructorId: user.id,
                },
            });
            return (0, functions_1.successResponse)('Courses', courses);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async InstructorStartLiveClass(user, class_id, class_name) {
        try {
            const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.AgoraCredentialsSlug);
            if (Number(data.agora_status) !== coreConstant_1.coreConstant.ACTIVE ||
                !data.agora_app_id ||
                !data.app_certificate) {
                return (0, functions_1.successResponse)('Live class not allowed!');
            }
            const role = agora_access_token_1.RtcRole.SUBSCRIBER;
            const token = await (0, functions_1.generateAccessTokenFunction)(data.agora_app_id, data.app_certificate, class_name, 0, 7200, role);
            const liveClass = await functions_1.PrismaClient.liveClass.update({
                where: {
                    id: class_id,
                },
                data: {
                    status: coreConstant_1.LiveCLassStatus.LIVE,
                },
            });
            if (!liveClass)
                return (0, functions_1.errorResponse)('Live class not found!');
            return (0, functions_1.successResponse)('Live class started successfully!', { token });
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async StudentJoinLiveClass(user, class_id, class_name) {
        try {
            const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.AgoraCredentialsSlug);
            if (Number(data.agora_status) !== coreConstant_1.coreConstant.ACTIVE ||
                !data.agora_app_id ||
                !data.app_certificate) {
                return (0, functions_1.successResponse)('Live class not allowed!');
            }
            const role = agora_access_token_1.RtcRole.SUBSCRIBER;
            const token = await (0, functions_1.generateAccessTokenFunction)(data.agora_app_id, data.app_certificate, class_name, 0, 7200, role);
            return (0, functions_1.successResponse)('Live class started successfully!', { token });
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async StudentLeaveLiveClass(user, className) {
        try {
            if (!className) {
                return (0, functions_1.errorResponse)('Please provide class id!');
            }
            if (user.roles.includes(String(coreConstant_1.coreConstant.ROLES.INSTRUCTOR))) {
                const changeClassStatus = await functions_1.PrismaClient.liveClass.update({
                    where: {
                        channel_name: className,
                    },
                    data: {
                        status: coreConstant_1.LiveCLassStatus.COMPLETED,
                    },
                });
                if (!changeClassStatus) {
                    return (0, functions_1.errorResponse)('Live class not found!');
                }
            }
            return (0, functions_1.successResponse)('Live class completed successfully!');
        }
        catch (error) {
            console.log(error, 'error in leave live class');
            (0, functions_1.processException)(error);
        }
    }
};
LiveClassService = __decorate([
    (0, common_1.Injectable)()
], LiveClassService);
exports.LiveClassService = LiveClassService;
//# sourceMappingURL=live-class.service.js.map