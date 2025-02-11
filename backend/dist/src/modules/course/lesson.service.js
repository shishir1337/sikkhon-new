"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonService = void 0;
const common_1 = require("@nestjs/common");
const functions_1 = require("../../shared/helpers/functions");
const response_model_1 = require("../../shared/models/response.model");
const coreConstant_1 = require("../../shared/helpers/coreConstant");
let LessonService = class LessonService {
    async createLesson(payload) {
        try {
            const course = await functions_1.PrismaClient.course.findUnique({
                where: {
                    id: payload.course_id,
                },
            });
            if (!course)
                return (0, functions_1.errorResponse)('Course ID not valid');
            const section = await functions_1.PrismaClient.section.findUnique({
                where: {
                    id: payload.section_id,
                },
            });
            if (!section)
                return (0, functions_1.errorResponse)('Section ID not valid');
            let video_url;
            if (payload.video_upload_source === coreConstant_1.UPLOAD_SOURCE.LOCAL &&
                payload.video_url) {
                let getVideo = await functions_1.PrismaClient.myUploads.findUnique({
                    where: {
                        id: parseInt(payload.video_url),
                    },
                });
                if (!getVideo) {
                    return (0, functions_1.errorResponse)('Video is not valid');
                }
                video_url = getVideo.file_path;
            }
            else {
                video_url = payload.video_url;
            }
            const lesson = await functions_1.PrismaClient.lesson.create({
                data: {
                    title: payload.title,
                    video_upload_source: payload.video_upload_source,
                    video_url: video_url,
                    description: payload.description,
                    course_id: payload.course_id,
                    section_id: payload.section_id,
                },
            });
            return (0, functions_1.successResponse)('Lesson created successfully', lesson);
        }
        catch (error) {
            console.log(error, 'This is an error');
            (0, functions_1.processException)(error);
        }
    }
    async getLessonBySectionId(sectionId) {
        try {
            if (!sectionId)
                return (0, functions_1.errorResponse)('Section ID not valid');
            const lessons = await functions_1.PrismaClient.lesson.findMany({
                where: {
                    section_id: sectionId,
                },
            });
            if (!lessons || lessons.length === 0) {
                return (0, functions_1.errorResponse)('No lessons found for the given course');
            }
            let lessonsWithUrl = [];
            lessons.map((lesson) => {
                lessonsWithUrl.push(Object.assign(Object.assign({}, lesson), { video_url: lesson.video_upload_source === coreConstant_1.UPLOAD_SOURCE.LOCAL
                        ? (0, functions_1.addPhotoPrefix)(lesson.video_url)
                        : lesson.video_url }));
            });
            return (0, functions_1.successResponse)('Lessons found successfully', lessonsWithUrl);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async editLesson(payload) {
        try {
            if (payload.course_id) {
                const course = await functions_1.PrismaClient.course.findUnique({
                    where: {
                        id: payload.course_id,
                    },
                });
                if (!course)
                    return (0, functions_1.errorResponse)('Course ID not valid');
            }
            if (payload.section_id) {
                const section = await functions_1.PrismaClient.section.findUnique({
                    where: {
                        id: payload.section_id,
                    },
                });
                if (!section)
                    return (0, functions_1.errorResponse)('Section ID not valid');
            }
            let video_url;
            if (payload.video_upload_source === coreConstant_1.UPLOAD_SOURCE.LOCAL &&
                payload.video_url) {
                let getVideo = await functions_1.PrismaClient.myUploads.findUnique({
                    where: {
                        id: parseInt(payload.video_url),
                    },
                });
                if (!getVideo) {
                    return (0, functions_1.errorResponse)('Video is not valid');
                }
                video_url = getVideo.file_path;
            }
            else {
                video_url = payload.video_url;
            }
            const lesson = await functions_1.PrismaClient.lesson.update({
                where: {
                    id: payload.id,
                },
                data: {
                    title: payload.title,
                    video_upload_source: payload.video_upload_source,
                    video_url: video_url,
                    description: payload.description,
                    course_id: payload.course_id,
                    section_id: payload.section_id,
                },
            });
            return (0, functions_1.successResponse)('Section updated successfully', lesson);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async deleteLesson(lessonId) {
        try {
            if (!lessonId)
                return (0, functions_1.errorResponse)('Lesson id is required');
            const lesson = await functions_1.PrismaClient.lesson.findUnique({
                where: {
                    id: lessonId,
                },
            });
            if (!lesson) {
                return (0, functions_1.errorResponse)('Section not found');
            }
            const courseIsAlreadyUse = await functions_1.PrismaClient.userLession.count({
                where: {
                    lessonId: lesson.id,
                },
            });
            if (courseIsAlreadyUse > 0) {
                return (0, functions_1.errorResponse)('This lession is already enrolled, you can not delete this!');
            }
            await functions_1.PrismaClient.lesson.delete({
                where: {
                    id: lesson.id,
                },
            });
            return (0, functions_1.successResponse)('Lesson deleted successfully');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async checkLession(user, payload) {
        try {
            const checkLession = await functions_1.PrismaClient.lesson.findFirst({
                where: {
                    id: payload.lession_id,
                    course_id: payload.course_id,
                    section_id: payload.section_id,
                },
            });
            if (!checkLession) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            const courseEnrollmentDetails = await functions_1.PrismaClient.courseEnrollment.findFirst({
                where: {
                    user_id: user.id,
                    course_id: checkLession.course_id,
                },
            });
            if (!courseEnrollmentDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            const userLession = await functions_1.PrismaClient.userLession.findFirst({
                where: {
                    userId: user.id,
                    courseId: checkLession.course_id,
                    sectionId: checkLession.section_id,
                    lessonId: checkLession.id,
                },
            });
            if (userLession) {
                await functions_1.PrismaClient.userLession.update({
                    where: {
                        id: userLession.id,
                    },
                    data: {
                        userId: user.id,
                        courseId: checkLession.course_id,
                        courseEnrollmentId: courseEnrollmentDetails.id,
                        sectionId: checkLession.section_id,
                        lessonId: checkLession.id,
                        is_completed: userLession.is_completed ? false : true,
                    },
                });
            }
            else {
                await functions_1.PrismaClient.userLession.create({
                    data: {
                        userId: user.id,
                        courseId: checkLession.course_id,
                        courseEnrollmentId: courseEnrollmentDetails.id,
                        sectionId: checkLession.section_id,
                        lessonId: checkLession.id,
                        is_completed: true,
                    },
                });
            }
            const totalLession = await functions_1.PrismaClient.lesson.findMany({
                where: {
                    course_id: checkLession.course_id,
                },
            });
            const totalCompleteLessionList = await functions_1.PrismaClient.userLession.findMany({
                where: {
                    userId: user.id,
                    courseId: checkLession.course_id,
                    is_completed: true,
                },
            });
            const quizList = await functions_1.PrismaClient.quiz.findMany({
                where: {
                    courseId: checkLession.course_id,
                },
            });
            const userCompletedQuizList = await functions_1.PrismaClient.userQuiz.groupBy({
                by: ['quizId'],
                where: {
                    studentId: user.id,
                    courseId: checkLession.course_id,
                    is_completed: coreConstant_1.coreConstant.STATUS_ACTIVE,
                },
            });
            const totalCompletePercentage = ((totalCompleteLessionList.length + userCompletedQuizList.length) *
                100) /
                (totalLession.length + quizList.length);
            if (totalCompleteLessionList.length === totalLession.length &&
                userCompletedQuizList.length === quizList.length) {
                await functions_1.PrismaClient.courseEnrollment.update({
                    where: {
                        id: courseEnrollmentDetails.id,
                    },
                    data: {
                        is_completed: true,
                    },
                });
            }
            const data = {
                total_complete_percentage: totalCompletePercentage.toFixed(2),
            };
            let message;
            if (userLession) {
                if (userLession.is_completed) {
                    message = 'Lession is marked as complete';
                }
                else {
                    message = 'Lession is marked as incomplete';
                }
            }
            else {
                message = 'Lession is marked as complete';
            }
            return (0, functions_1.successResponse)(message, data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
};
LessonService = __decorate([
    (0, common_1.Injectable)()
], LessonService);
exports.LessonService = LessonService;
//# sourceMappingURL=lesson.service.js.map