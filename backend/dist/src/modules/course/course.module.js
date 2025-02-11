"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModule = void 0;
const common_1 = require("@nestjs/common");
const course_service_1 = require("./course.service");
const course_controller_1 = require("./user/course.controller");
const admin_course_controller_1 = require("./admin/admin-course.controller");
const section_service_1 = require("./section.service");
const notification_service_1 = require("../notification-management/notification.service");
const lesson_service_1 = require("./lesson.service");
const public_course_controller_1 = require("./public/public-course.controller");
let CourseModule = class CourseModule {
};
CourseModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            course_controller_1.CourseController,
            admin_course_controller_1.AdminCourseController,
            public_course_controller_1.PublicCourseController,
        ],
        providers: [
            course_service_1.CourseService,
            section_service_1.SectionService,
            notification_service_1.NotificationService,
            lesson_service_1.LessonService,
        ],
    })
], CourseModule);
exports.CourseModule = CourseModule;
//# sourceMappingURL=course.module.js.map