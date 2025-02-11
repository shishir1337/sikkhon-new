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
exports.AdminCourseController = void 0;
const common_1 = require("@nestjs/common");
const course_service_1 = require("../course.service");
const is_admin_decorator_1 = require("../../../shared/decorators/is-admin.decorator");
const change_course_status_dto_1 = require("./dto/change-course-status.dto");
const create_edit_course_dto_1 = require("./dto/create-edit-course.dto");
const types_1 = require("../../../shared/constants/types");
const section_service_1 = require("../section.service");
const lesson_service_1 = require("../lesson.service");
const create_section_dto_1 = require("../user/dto/create-section.dto");
const edit_section_dto_1 = require("../user/dto/edit-section.dto");
const create_lesson_1 = require("../user/dto/create-lesson.");
const edit_lesson_1 = require("../user/dto/edit-lesson");
let AdminCourseController = class AdminCourseController {
    constructor(courseService, sectionService, lessonService) {
        this.courseService = courseService;
        this.sectionService = sectionService;
        this.lessonService = lessonService;
    }
    getCourseListForAdmin(payload) {
        return this.courseService.getCourseListForAdmin(payload);
    }
    getCourseDetailsForAdmin(id) {
        return this.courseService.getCourseDetailsForAdmin(id);
    }
    getCourseDetailsSections(course_id) {
        return this.courseService.getCourseDetailsSections(course_id);
    }
    changeCourseStatusByAdmin(payload) {
        return this.courseService.changeCourseStatusByAdmin(payload);
    }
    createCourseByAdmin(payload) {
        return this.courseService.createCourseByAdmin(payload);
    }
    deleteCourseByAdmin(id) {
        return this.courseService.deleteCourseByAdmin(id);
    }
    createCourseSection(payload) {
        return this.sectionService.createSection(payload);
    }
    editCourseSection(payload) {
        return this.sectionService.updateSection(payload);
    }
    deleteInstructorCoursesSection(section_id) {
        return this.sectionService.adminDeleteSection(section_id);
    }
    getSectionById(section_id) {
        return this.sectionService.getSectionById(section_id);
    }
    createLesson(payload) {
        return this.lessonService.createLesson(payload);
    }
    editLesson(payload) {
        return this.lessonService.editLesson(payload);
    }
    deleteLesson(lesson_id) {
        return this.lessonService.deleteLesson(lesson_id);
    }
    getLessonBySectionId(section_id) {
        return this.lessonService.getLessonBySectionId(section_id);
    }
    getAllCourseReport(payload) {
        return this.courseService.getAllCourseReport(payload);
    }
};
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Get)('course-list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminCourseController.prototype, "getCourseListForAdmin", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Get)('course-details/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminCourseController.prototype, "getCourseDetailsForAdmin", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Get)('get-course-details-sections/:course_id'),
    __param(0, (0, common_1.Param)('course_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminCourseController.prototype, "getCourseDetailsSections", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Post)('change-course-status'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_course_status_dto_1.ChangeCourseStatusDto]),
    __metadata("design:returntype", void 0)
], AdminCourseController.prototype, "changeCourseStatusByAdmin", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Post)('create-edit-course'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_edit_course_dto_1.CreateCourseByAdminDto]),
    __metadata("design:returntype", void 0)
], AdminCourseController.prototype, "createCourseByAdmin", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Delete)('delete-course/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminCourseController.prototype, "deleteCourseByAdmin", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Post)('create-section'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_section_dto_1.CreateSectionDto]),
    __metadata("design:returntype", void 0)
], AdminCourseController.prototype, "createCourseSection", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Patch)('edit-section'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [edit_section_dto_1.EditSectionDto]),
    __metadata("design:returntype", void 0)
], AdminCourseController.prototype, "editCourseSection", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Delete)('delete-course-section/:section_id'),
    __param(0, (0, common_1.Param)('section_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminCourseController.prototype, "deleteInstructorCoursesSection", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Get)('get-section-by-id/:section_id'),
    __param(0, (0, common_1.Param)('section_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminCourseController.prototype, "getSectionById", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Post)('create-lesson'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lesson_1.CreateLessonDto]),
    __metadata("design:returntype", void 0)
], AdminCourseController.prototype, "createLesson", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Patch)('edit-lesson'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [edit_lesson_1.EditLessonDto]),
    __metadata("design:returntype", void 0)
], AdminCourseController.prototype, "editLesson", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Delete)('delete-lesson/:lesson_id'),
    __param(0, (0, common_1.Param)('lesson_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminCourseController.prototype, "deleteLesson", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Get)('get-lesson-by-section-id/:section_id'),
    __param(0, (0, common_1.Param)('section_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminCourseController.prototype, "getLessonBySectionId", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Get)('course-report'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminCourseController.prototype, "getAllCourseReport", null);
AdminCourseController = __decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [course_service_1.CourseService,
        section_service_1.SectionService,
        lesson_service_1.LessonService])
], AdminCourseController);
exports.AdminCourseController = AdminCourseController;
//# sourceMappingURL=admin-course.controller.js.map