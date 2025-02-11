"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const util_1 = require("util");
const path = __importStar(require("path"));
const handlebars = __importStar(require("handlebars"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const functions_1 = require("../../shared/helpers/functions");
const coreConstant_1 = require("../../shared/helpers/coreConstant");
const fs_2 = __importDefault(require("fs"));
const readFileAsync = (0, util_1.promisify)(fs_1.readFile);
let CertificateService = class CertificateService {
    async loadTemplate(templatePath) {
        const fullPath = path.join(process.cwd(), 'src', 'modules', 'certificate-management', 'templates', templatePath);
        return await readFileAsync(fullPath, 'utf8');
    }
    async checkCertificateVerification(user, course_id) {
        const courseDetails = await functions_1.PrismaClient.course.findFirst({
            where: {
                id: course_id,
            },
            include: {
                User: true,
                Lesson: true,
                Quiz: true,
            },
        });
        if (!courseDetails) {
            return (0, functions_1.errorResponse)('Invalid Course!');
        }
        const checkEnrolled = await functions_1.PrismaClient.courseEnrollment.findFirst({
            where: {
                course_id: courseDetails.id,
                user_id: user.id,
            },
        });
        if (!checkEnrolled) {
            return (0, functions_1.errorResponse)('You are not enrolled in this course!');
        }
        const userCompletedLession = await functions_1.PrismaClient.userLession.findMany({
            where: {
                userId: user.id,
                courseId: courseDetails.id,
                is_completed: true,
            },
        });
        if (courseDetails.Lesson.length !== userCompletedLession.length) {
            return (0, functions_1.errorResponse)('You are not eligible for get certificate, because you do not complete your all lession!');
        }
        const userCompletedQuizList = await functions_1.PrismaClient.userQuiz.groupBy({
            by: ['quizId'],
            where: {
                studentId: user.id,
                courseId: courseDetails.id,
                is_completed: coreConstant_1.coreConstant.STATUS_ACTIVE,
            },
        });
        if (courseDetails.Quiz.length !== userCompletedQuizList.length) {
            return (0, functions_1.errorResponse)('You are not eligible for get certificate, because you do not give all quiz!');
        }
        const data = {
            course_details: courseDetails,
        };
        return (0, functions_1.successResponse)('you are eligible to get certificate!', data);
    }
    async generateCertificate(user, course_id) {
        try {
            const checkEligibilityForCertificate = await this.checkCertificateVerification(user, course_id);
            if (!checkEligibilityForCertificate.success) {
                return checkEligibilityForCertificate;
            }
            const courseDetails = checkEligibilityForCertificate.data.course_details;
            const checkEnrolled = await functions_1.PrismaClient.courseEnrollment.findFirst({
                where: {
                    course_id: course_id,
                    user_id: user.id,
                },
            });
            if (!checkEnrolled) {
                return (0, functions_1.errorResponse)('You are not enrolled in this course!');
            }
            const htmlTemplate = await this.loadTemplate('template.hbs');
            const compiledTemplate = handlebars.compile(htmlTemplate);
            let duration = await (0, functions_1.convertMinutesToHoursAndMinutes)(courseDetails.duration);
            const compile_data = {
                student_name: user.first_name + ' ' + user.last_name,
                duration: duration,
                course_title: courseDetails.name,
                complete_date: await (0, functions_1.formatDateTime)(checkEnrolled.created_at),
                instructor_name: courseDetails.User.first_name + ' ' + courseDetails.User.last_name,
                site_name: (await (0, functions_1.adminSettingsValueBySlug)('site_name')) || 'N/A',
            };
            const renderedContent = compiledTemplate(compile_data);
            const browser = await puppeteer_1.default.launch({
                headless: 'new',
            });
            const page = await browser.newPage();
            await page.setContent(renderedContent, { waitUntil: 'domcontentloaded' });
            const uploadDirectory = `./storage/certificate/`;
            if (!fs_2.default.existsSync(uploadDirectory)) {
                fs_2.default.mkdirSync(uploadDirectory);
            }
            const certificate_path = 'storage/certificate/' +
                user.first_name +
                '-' +
                user.id +
                '-' +
                courseDetails.id +
                '.pdf';
            await page.emulateMediaType('screen');
            const pdf = await page.pdf({
                path: certificate_path,
                margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
                printBackground: true,
                format: 'A4',
            });
            await browser.close();
            const data = {
                file_path: (0, functions_1.addPhotoPrefix)('/' + certificate_path),
            };
            return (0, functions_1.successResponse)('Certificate generate is done!', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
};
CertificateService = __decorate([
    (0, common_1.Injectable)()
], CertificateService);
exports.CertificateService = CertificateService;
//# sourceMappingURL=certificate.service.js.map