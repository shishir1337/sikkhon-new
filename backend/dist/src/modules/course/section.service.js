"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionService = void 0;
const common_1 = require("@nestjs/common");
const functions_1 = require("../../shared/helpers/functions");
const response_model_1 = require("../../shared/models/response.model");
let SectionService = class SectionService {
    async createSection(payload) {
        try {
            const find_course = await functions_1.PrismaClient.course.findUnique({
                where: {
                    id: payload.courseId,
                },
            });
            if (!find_course)
                return (0, functions_1.errorResponse)('Course not found');
            const createdSection = await functions_1.PrismaClient.section.create({
                data: {
                    title: payload.title,
                    course_id: payload.courseId,
                },
            });
            return (0, functions_1.successResponse)('Section created successfully', createdSection);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getSectionsByCourseId(courseId) {
        try {
            const sections = await functions_1.PrismaClient.section.findMany({
                where: {
                    course_id: courseId,
                },
            });
            if (!sections || sections.length === 0) {
                return (0, functions_1.errorResponse)('No sections found for the given course');
            }
            return (0, functions_1.successResponse)('Sections found successfully', sections);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getSectionById(sectionId) {
        try {
            if (!sectionId)
                return (0, functions_1.errorResponse)('Section id is required');
            const section = await functions_1.PrismaClient.section.findUnique({
                where: {
                    id: sectionId,
                },
            });
            if (!section) {
                return (0, functions_1.errorResponse)('Section not found');
            }
            return (0, functions_1.successResponse)('Section found successfully', section);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async updateSection(payload) {
        try {
            const updatedSection = await functions_1.PrismaClient.section.update({
                where: {
                    id: payload.id,
                },
                data: {
                    title: payload.title,
                    course_id: payload.courseId,
                },
            });
            return (0, functions_1.successResponse)('Section updated successfully', updatedSection);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async deleteSection(sectionId, user) {
        try {
            if (!sectionId)
                return (0, functions_1.errorResponse)('Section id is required');
            const section = await functions_1.PrismaClient.section.findUnique({
                where: {
                    id: sectionId,
                },
                include: {
                    Lesson: true,
                    course: true,
                },
            });
            if (!section) {
                return (0, functions_1.errorResponse)('Section not found');
            }
            const courseIsAlreadyUse = await functions_1.PrismaClient.userLession.count({
                where: {
                    sectionId: section.id,
                },
            });
            if (courseIsAlreadyUse > 0) {
                return (0, functions_1.errorResponse)('This section is already enrolled, you can not delete this!');
            }
            if (section.course.instructorId !== user.id) {
                return (0, functions_1.errorResponse)('You are not authorized to delete this section');
            }
            if (section.Lesson.length > 0) {
                await Promise.all(section.Lesson.map(async (lesson) => {
                    await functions_1.PrismaClient.lesson.delete({
                        where: {
                            id: lesson.id,
                        },
                    });
                }));
            }
            const deletedSection = await functions_1.PrismaClient.section.delete({
                where: {
                    id: sectionId,
                },
            });
            return (0, functions_1.successResponse)('Section deleted successfully', deletedSection);
        }
        catch (error) {
            console.log(error, 'This is an error');
            (0, functions_1.processException)(error);
        }
    }
    async adminDeleteSection(sectionId) {
        try {
            if (!sectionId)
                return (0, functions_1.errorResponse)('Section id is required');
            const section = await functions_1.PrismaClient.section.findUnique({
                where: {
                    id: sectionId,
                },
                include: {
                    Lesson: true,
                    course: true,
                },
            });
            if (!section) {
                return (0, functions_1.errorResponse)('Section not found');
            }
            if (section.Lesson.length > 0) {
                await Promise.all(section.Lesson.map(async (lesson) => {
                    await functions_1.PrismaClient.lesson.delete({
                        where: {
                            id: lesson.id,
                        },
                    });
                }));
            }
            const deletedSection = await functions_1.PrismaClient.section.delete({
                where: {
                    id: sectionId,
                },
            });
            return (0, functions_1.successResponse)('Section deleted successfully', deletedSection);
        }
        catch (error) {
            console.log(error, 'This is an error');
            (0, functions_1.processException)(error);
        }
    }
};
SectionService = __decorate([
    (0, common_1.Injectable)()
], SectionService);
exports.SectionService = SectionService;
//# sourceMappingURL=section.service.js.map