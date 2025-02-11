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
exports.PublicService = void 0;
const common_1 = require("@nestjs/common");
const array_constants_1 = require("../../shared/constants/array.constants");
const coreConstant_1 = require("../../shared/helpers/coreConstant");
const functions_1 = require("../../shared/helpers/functions");
const getAdminSettingsData_1 = require("../../shared/helpers/getAdminSettingsData");
const response_model_1 = require("../../shared/models/response.model");
const review_service_1 = require("../review/review.service");
let PublicService = class PublicService {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    async getAllLanguageList() {
        const languageList = array_constants_1.LanguageListJsonArray;
        return (0, functions_1.successResponse)('Language list', languageList);
    }
    async commonSettings() {
        var _a, _b, _c, _d, _e, _f;
        try {
            const data = {};
            data['settings'] = await (0, getAdminSettingsData_1.getAdminSettingsData)(array_constants_1.CommonSettingsSlugs);
            data['stripe'] = await (0, getAdminSettingsData_1.getAdminSettingsData)(array_constants_1.PaymentMethodStripeSettingsSlugs);
            data['agora'] = await (0, getAdminSettingsData_1.getAdminSettingsData)(array_constants_1.AgoraCredentialsSlug);
            if ((_a = data['settings']) === null || _a === void 0 ? void 0 : _a.site_logo) {
                data['settings'].site_logo = (0, functions_1.addPhotoPrefix)((_b = data['settings']) === null || _b === void 0 ? void 0 : _b.site_logo);
            }
            if ((_c = data['settings']) === null || _c === void 0 ? void 0 : _c.site_fav_icon) {
                data['settings'].site_fav_icon = (0, functions_1.addPhotoPrefix)((_d = data['settings']) === null || _d === void 0 ? void 0 : _d.site_fav_icon);
            }
            if ((_e = data['settings']) === null || _e === void 0 ? void 0 : _e.site_footer_logo) {
                data['settings'].site_footer_logo = (0, functions_1.addPhotoPrefix)((_f = data['settings']) === null || _f === void 0 ? void 0 : _f.site_footer_logo);
            }
            data['countryList'] = array_constants_1.CountryListObjectArray;
            data['language_list'] = array_constants_1.LanguageListJsonArray;
            return (0, functions_1.successResponse)('Common settings', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getLandingPageData() {
        try {
            const courseList = await functions_1.PrismaClient.course.findMany({
                where: {
                    status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                },
                include: {
                    Lesson: true,
                    Review: true,
                    category: true,
                    User: {
                        select: {
                            id: true,
                            first_name: true,
                            last_name: true,
                            photo: true,
                        },
                    },
                },
                take: 10,
            });
            courseList.map((courseDetails) => {
                courseDetails.thumbnail_link = courseDetails.thumbnail_link.startsWith('http')
                    ? (0, functions_1.addPhotoPrefix)(courseDetails.thumbnail_link)
                    : courseDetails.thumbnail_link;
                courseDetails.cover_image_link =
                    courseDetails.cover_image_link.startsWith('http')
                        ? (0, functions_1.addPhotoPrefix)(courseDetails.cover_image_link)
                        : courseDetails.cover_image_link;
                courseDetails.User.photo = courseDetails.User.photo
                    ? (0, functions_1.addPhotoPrefix)(courseDetails.User.photo)
                    : courseDetails.User.photo;
            });
            const roles = String(coreConstant_1.coreConstant.ROLES.INSTRUCTOR);
            const instructorList = await functions_1.PrismaClient.user.findMany({
                where: {
                    status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                    roles: {
                        contains: roles,
                    },
                },
                take: 5,
            });
            instructorList.map((instructorDetails) => {
                instructorDetails.photo = instructorDetails.photo
                    ? (0, functions_1.addPhotoPrefix)(instructorDetails.photo)
                    : instructorDetails.photo;
                delete instructorDetails.password;
            });
            const faqList = await functions_1.PrismaClient.faq.findMany({
                where: {
                    type: coreConstant_1.faqTypeConstant.LANDING_PAGE,
                    status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                },
            });
            const data = await (0, getAdminSettingsData_1.getAdminSettingsData)(array_constants_1.LandingPageSlugs);
            data.landing_main_banner_image_url = (0, functions_1.addPhotoPrefix)(data.landing_main_banner_image_url);
            data.landing_about_us_first_image_url = (0, functions_1.addPhotoPrefix)(data.landing_about_us_first_image_url);
            data.landing_about_us_second_image_url = (0, functions_1.addPhotoPrefix)(data.landing_about_us_second_image_url);
            data.landing_about_us_third_image_url = (0, functions_1.addPhotoPrefix)(data.landing_about_us_third_image_url);
            data.landing_choose_us_first_image_url = (0, functions_1.addPhotoPrefix)(data.landing_choose_us_first_image_url);
            data.landing_how_it_work_list_first_image_url = (0, functions_1.addPhotoPrefix)(data.landing_how_it_work_list_first_image_url);
            data.landing_how_it_work_list_second_image_url = (0, functions_1.addPhotoPrefix)(data.landing_how_it_work_list_second_image_url);
            data.landing_how_it_work_list_third_image_url = (0, functions_1.addPhotoPrefix)(data.landing_how_it_work_list_third_image_url);
            const blogList = await functions_1.PrismaClient.blog.findMany({
                where: {
                    status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                },
                take: 4,
                orderBy: {
                    created_at: 'desc',
                },
            });
            blogList.map((blogDetails) => {
                blogDetails.thumbnail_link = blogDetails.thumbnail_link.startsWith('http')
                    ? blogDetails.thumbnail_link
                    : (0, functions_1.addPhotoPrefix)(blogDetails.thumbnail_link);
                blogDetails.meta_img = blogDetails.meta_img.startsWith('http')
                    ? blogDetails.meta_img
                    : (0, functions_1.addPhotoPrefix)(blogDetails.meta_img);
                blogDetails.cover_image_link = blogDetails.cover_image_link.startsWith('http')
                    ? blogDetails.cover_image_link
                    : (0, functions_1.addPhotoPrefix)(blogDetails.cover_image_link);
            });
            const landingData = {
                landing_data: data,
                course_list: courseList,
                instructor_list: instructorList,
                faq_list: faqList,
                blogList: blogList,
            };
            return (0, functions_1.successResponse)('Landing page data!', landingData);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getInstructorProfileDetails(user_name) {
        try {
            const instructorDetails = await functions_1.PrismaClient.user.findFirst({
                where: {
                    user_name: user_name,
                },
                include: {
                    Course: {
                        where: {
                            status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                        },
                        include: {
                            category: true,
                            User: true,
                            Review: true,
                        },
                    },
                },
            });
            if (!instructorDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            delete instructorDetails.password;
            if (instructorDetails.photo) {
                instructorDetails.photo = (0, functions_1.addPhotoPrefix)(instructorDetails.photo);
            }
            const Course = await functions_1.PrismaClient.course.findMany({
                where: {
                    instructorId: instructorDetails.id,
                    status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                    private_status: false,
                },
                include: {
                    User: true,
                },
            });
            const formattedCourses = Course === null || Course === void 0 ? void 0 : Course.map((course) => (0, functions_1.processCourseLinks)(course));
            const isInstructor = await (0, functions_1.checkRoleIsValid)(instructorDetails.roles, coreConstant_1.coreConstant.ROLES.INSTRUCTOR);
            if (!isInstructor) {
                return (0, functions_1.errorResponse)('This is not an instructor profile!');
            }
            const followerList = await functions_1.PrismaClient.instructorFollower.findMany({
                where: {
                    instructorId: instructorDetails.id,
                },
                include: {
                    Student: true,
                    Instructor: true,
                },
            });
            const enrolledStudents = await functions_1.PrismaClient.courseEnrollment.findMany({
                where: {
                    course: {
                        instructorId: instructorDetails.id,
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
            const allReviews = instructorDetails.Course.reduce((reviews, course) => {
                if (course.Review) {
                    reviews.push(...course.Review);
                }
                return reviews;
            }, []);
            const data = {
                total_follower: followerList.length,
                profile_details: instructorDetails,
                enrolled_students: formattedStudents.length,
                review_count: allReviews.length,
                courses: formattedCourses,
            };
            return (0, functions_1.successResponse)('Instructor profile details', data);
        }
        catch (error) {
            console.log(error, 'SSSsssss');
            (0, functions_1.processException)(error);
        }
    }
    async getInstructors() {
        try {
            const instructors = await functions_1.PrismaClient.user.findMany({
                where: {
                    roles: {
                        contains: `${coreConstant_1.coreConstant.ROLES.INSTRUCTOR}`,
                    },
                },
            });
            const userListWithoutPassword = await (0, functions_1.removePasswordFromUserList)(instructors);
            return (0, functions_1.successResponse)('List of instructors', userListWithoutPassword);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getTermsConditionData() {
        try {
            const data = await (0, getAdminSettingsData_1.getAdminSettingsData)(array_constants_1.TermsConditionSlugs);
            return (0, functions_1.successResponse)('Terms condition data!', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getPrivacyPolicyData() {
        try {
            const data = await (0, getAdminSettingsData_1.getAdminSettingsData)(array_constants_1.PrivacyPolicySlugs);
            return (0, functions_1.successResponse)('Privacy policy data!', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
};
PublicService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [review_service_1.ReviewService])
], PublicService);
exports.PublicService = PublicService;
//# sourceMappingURL=public.service.js.map