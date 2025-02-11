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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const common_1 = require("@nestjs/common");
const is_instructor_decorator_1 = require("../../../shared/decorators/is-instructor.decorator");
const course_service_1 = require("../course.service");
const types_1 = require("../../../shared/constants/types");
const client_1 = require("@prisma/client");
const user_decorators_1 = require("../../../shared/decorators/user.decorators");
const create_edit_course_dto_1 = require("./dto/create-edit-course.dto");
const create_section_dto_1 = require("./dto/create-section.dto");
const section_service_1 = require("../section.service");
const edit_section_dto_1 = require("./dto/edit-section.dto");
const lesson_service_1 = require("../lesson.service");
const create_lesson_1 = require("./dto/create-lesson.");
const edit_lesson_1 = require("./dto/edit-lesson");
const check_lession_dto_1 = require("./dto/check-lession.dto");
let CourseController = class CourseController {
    constructor(courseService, sectionService, lessonService) {
        this.courseService = courseService;
        this.sectionService = sectionService;
        this.lessonService = lessonService;
    }
    checkCourseEnrollment(course_id, user) {
        return this.courseService.checkCourseEnrollment(course_id, user);
    }
    getInstructorCourses(payload, user) {
        return this.courseService.getInstructorCourses(payload, user);
    }
    getInstructorStudents(payload, user) {
        return this.courseService.getInstructorStudents(payload, user);
    }
    getCourseDetails(course_id, user) {
        return this.courseService.getCourseDetails(course_id, user);
    }
    getCourseDetailsSections(course_id, user) {
        return this.courseService.getCourseDetailsSections(course_id);
    }
    createInstructorCourses(payload, user) {
        console.log({ payload, user });
        return this.courseService.createEditCourse(payload, user);
    }
    deleteInstructorCourses(id, user) {
        return this.courseService.deleteCourse(id, user);
    }
    getEnrolledCourses(payload, user) {
        return this.courseService.getEnrolledCourses(user, payload);
    }
    createCourseSection(payload) {
        return this.sectionService.createSection(payload);
    }
    editCourseSection(payload) {
        return this.sectionService.updateSection(payload);
    }
    deleteInstructorCoursesSection(section_id, user) {
        return this.sectionService.deleteSection(section_id, user);
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
    checkLession(user, payload) {
        return this.lessonService.checkLession(user, payload);
    }
    getEnrolledCourseDetails(user, course_id) {
        return this.courseService.getEnrolledCourseDetails(user, course_id);
    }
};
__decorate([
    (0, common_1.Get)('check-course-enrollment/:course_id'),
    __param(0, (0, common_1.Param)('course_id')),
    __param(1, (0, user_decorators_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_a = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "checkCourseEnrollment", null);
__decorate([
    (0, is_instructor_decorator_1.IsInstructor)(),
    (0, common_1.Get)('get-instructor-courses'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, user_decorators_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "getInstructorCourses", null);
__decorate([
    (0, is_instructor_decorator_1.IsInstructor)(),
    (0, common_1.Get)('get-instructor-students'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, user_decorators_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_c = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "getInstructorStudents", null);
__decorate([
    (0, is_instructor_decorator_1.IsInstructor)(),
    (0, common_1.Get)('get-instructor-course-details/:course_id'),
    __param(0, (0, common_1.Param)('course_id')),
    __param(1, (0, user_decorators_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_d = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "getCourseDetails", null);
__decorate([
    (0, is_instructor_decorator_1.IsInstructor)(),
    (0, common_1.Get)('get-course-details-sections/:course_id'),
    __param(0, (0, common_1.Param)('course_id')),
    __param(1, (0, user_decorators_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_e = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _e : Object]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "getCourseDetailsSections", null);
__decorate([
    (0, is_instructor_decorator_1.IsInstructor)(),
    (0, common_1.Post)('create-edit-instructor-course'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorators_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_edit_course_dto_1.CreateEditCourseDto, typeof (_f = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _f : Object]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "createInstructorCourses", null);
__decorate([
    (0, is_instructor_decorator_1.IsInstructor)(),
    (0, common_1.Delete)('delete-instructor-course/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorators_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_g = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _g : Object]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "deleteInstructorCourses", null);
__decorate([
    (0, common_1.Get)('get-my-enrolled-courses'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, user_decorators_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_h = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _h : Object]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "getEnrolledCourses", null);
__decorate([
    (0, is_instructor_decorator_1.IsInstructor)(),
    (0, common_1.Post)('create-section'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_section_dto_1.CreateSectionDto]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "createCourseSection", null);
__decorate([
    (0, is_instructor_decorator_1.IsInstructor)(),
    (0, common_1.Patch)('edit-section'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [edit_section_dto_1.EditSectionDto]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "editCourseSection", null);
__decorate([
    (0, is_instructor_decorator_1.IsInstructor)(),
    (0, common_1.Delete)('delete-instructor-course-section/:section_id'),
    __param(0, (0, common_1.Param)('section_id')),
    __param(1, (0, user_decorators_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_j = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _j : Object]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "deleteInstructorCoursesSection", null);
__decorate([
    (0, is_instructor_decorator_1.IsInstructor)(),
    (0, common_1.Get)('get-section-by-id/:section_id'),
    __param(0, (0, common_1.Param)('section_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "getSectionById", null);
__decorate([
    (0, is_instructor_decorator_1.IsInstructor)(),
    (0, common_1.Post)('create-lesson'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lesson_1.CreateLessonDto]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "createLesson", null);
__decorate([
    (0, is_instructor_decorator_1.IsInstructor)(),
    (0, common_1.Patch)('edit-lesson'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [edit_lesson_1.EditLessonDto]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "editLesson", null);
__decorate([
    (0, is_instructor_decorator_1.IsInstructor)(),
    (0, common_1.Delete)('delete-lesson/:lesson_id'),
    __param(0, (0, common_1.Param)('lesson_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "deleteLesson", null);
__decorate([
    (0, is_instructor_decorator_1.IsInstructor)(),
    (0, common_1.Get)('get-lesson-by-section-id/:section_id'),
    __param(0, (0, common_1.Param)('section_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "getLessonBySectionId", null);
__decorate([
    (0, common_1.Post)('check-lession'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _k : Object, check_lession_dto_1.CheckLessionDto]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "checkLession", null);
__decorate([
    (0, common_1.Get)('enrolled-course-details-:course_id'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Param)('course_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _l : Object, Number]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "getEnrolledCourseDetails", null);
CourseController = __decorate([
    (0, common_1.Controller)('course'),
    __metadata("design:paramtypes", [course_service_1.CourseService,
        section_service_1.SectionService,
        lesson_service_1.LessonService])
], CourseController);
exports.CourseController = CourseController;
//# sourceMappingURL=course.controller.js.map