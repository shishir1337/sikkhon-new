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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const types_1 = require("../../shared/constants/types");
const coreConstant_1 = require("../../shared/helpers/coreConstant");
const functions_1 = require("../../shared/helpers/functions");
const response_model_1 = require("../../shared/models/response.model");
const is_admin_decorator_1 = require("../../shared/decorators/is-admin.decorator");
const notification_service_1 = require("../notification-management/notification.service");
let CourseService = class CourseService {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async checkCourseExistAndBelongsToUser(courseId, userId) {
        const course = await functions_1.PrismaClient.course.findUnique({
            where: {
                id: courseId,
            },
        });
        if (!course) {
            return (0, functions_1.errorResponse)('Course not found');
        }
        if (course.instructorId !== userId) {
            return (0, functions_1.errorResponse)('Course does not belong to the user');
        }
    }
    async getInstructorCourses(payload, user) {
        try {
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            const courses = await functions_1.PrismaClient.course.findMany(Object.assign(Object.assign({ where: {
                    instructorId: user.id,
                } }, paginate), { orderBy: {
                    created_at: 'desc',
                } }));
            let updatedCourses = [];
            await courses.map((course) => {
                var _a, _b, _c;
                updatedCourses.push(Object.assign(Object.assign({}, course), { thumbnail_link: ((_a = course.thumbnail_link) === null || _a === void 0 ? void 0 : _a.startsWith('http'))
                        ? course.thumbnail_link
                        : (0, functions_1.addPhotoPrefix)(course.thumbnail_link), cover_image_link: ((_b = course.cover_image_link) === null || _b === void 0 ? void 0 : _b.startsWith('http'))
                        ? course.cover_image_link
                        : (0, functions_1.addPhotoPrefix)(course.cover_image_link), demo_video: ((_c = course.demo_video) === null || _c === void 0 ? void 0 : _c.startsWith('http'))
                        ? course.demo_video
                        : (0, functions_1.addPhotoPrefix)(course.demo_video) }));
            });
            if (!courses || courses.length === 0) {
                return (0, functions_1.errorResponse)('No course found');
            }
            const paginationMeta = await (0, functions_1.paginationMetaData)('subCategory', payload);
            const data = {
                list: updatedCourses,
                meta: paginationMeta,
            };
            return (0, functions_1.successResponse)('Courses found Successfully', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getInstructorStudents(payload, user) {
        try {
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            const enrolledStudents = await functions_1.PrismaClient.courseEnrollment.findMany(Object.assign({ where: {
                    course: {
                        instructorId: user.id,
                    },
                }, include: {
                    user: true,
                } }, paginate));
            if (!enrolledStudents || enrolledStudents.length === 0) {
                return (0, functions_1.errorResponse)('No students found for the instructor.');
            }
            const uniqueUserIds = new Set();
            const formattedStudents = enrolledStudents.reduce((result, enrollment) => {
                const { id } = enrollment.user;
                console.log(id, 'id');
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
            const paginationMeta = await (0, functions_1.paginationMetaData)('courseEnrollment', payload);
            const data = {
                list: formattedStudents,
                meta: paginationMeta,
            };
            return (0, functions_1.successResponse)('Enrolled students for the instructor retrieved successfully.', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getCourseDetails(course_id, user) {
        var _a, _b, _c;
        try {
            let course_details = await functions_1.PrismaClient.course.findFirst({
                where: {
                    id: Number(course_id),
                    instructorId: user.id,
                },
                include: {
                    category: true,
                    sub_category: true,
                },
            });
            if (!course_details) {
                return (0, functions_1.errorResponse)('Course not found');
            }
            course_details.thumbnail_link = ((_a = course_details.thumbnail_link) === null || _a === void 0 ? void 0 : _a.startsWith('http'))
                ? course_details.thumbnail_link
                : (0, functions_1.addPhotoPrefix)(course_details.thumbnail_link);
            course_details.cover_image_link =
                ((_b = course_details.cover_image_link) === null || _b === void 0 ? void 0 : _b.startsWith('http'))
                    ? course_details.cover_image_link
                    : (0, functions_1.addPhotoPrefix)(course_details.cover_image_link);
            if (course_details.video_upload_source === coreConstant_1.UPLOAD_SOURCE.LOCAL) {
                course_details.demo_video = ((_c = course_details.demo_video) === null || _c === void 0 ? void 0 : _c.startsWith('http'))
                    ? course_details.demo_video
                    : (0, functions_1.addPhotoPrefix)(course_details.demo_video);
            }
            return (0, functions_1.successResponse)('Courses found Successfully', course_details);
        }
        catch (error) {
            console.log(error);
            (0, functions_1.processException)(error);
        }
    }
    async getCourseDetailsSections(course_id) {
        try {
            let course_sections = await functions_1.PrismaClient.section.findMany({
                where: {
                    course_id: Number(course_id),
                },
                include: {
                    Lesson: true,
                },
            });
            if (!course_sections.length) {
                return (0, functions_1.errorResponse)('Course not found');
            }
            return (0, functions_1.successResponse)('Courses Section found Successfully', course_sections);
        }
        catch (error) {
            console.log(error);
            (0, functions_1.processException)(error);
        }
    }
    async createEditCourse(createEditCourseDto, user) {
        try {
            const edit = !!createEditCourseDto.id;
            let exist;
            console.log({ edit });
            if (createEditCourseDto.name) {
                exist = await functions_1.PrismaClient.course.findUnique({
                    where: { name: createEditCourseDto.name },
                });
            }
            if (!edit && !createEditCourseDto.name) {
                return (0, functions_1.errorResponse)('Please enter course name');
            }
            let category;
            if (createEditCourseDto.category_id) {
                category = await functions_1.PrismaClient.category.findUnique({
                    where: { id: createEditCourseDto.category_id },
                });
            }
            let sub_category;
            if (createEditCourseDto.sub_category_id) {
                sub_category = await functions_1.PrismaClient.subCategory.findUnique({
                    where: { id: createEditCourseDto.sub_category_id },
                });
            }
            if (!category && createEditCourseDto.category_id) {
                return (0, functions_1.errorResponse)('Category not found!');
            }
            if (!sub_category && createEditCourseDto.sub_category_id) {
                return (0, functions_1.errorResponse)('Sub Category not found');
            }
            if (exist && !edit) {
                return (0, functions_1.errorResponse)('Course Name already exists, please try another');
            }
            if (createEditCourseDto.discount_status &&
                createEditCourseDto.discount_value <= 0) {
                return (0, functions_1.errorResponse)('Discount value must be greater than 0');
            }
            let slug;
            if (createEditCourseDto.name) {
                slug = await (0, functions_1.createSlug)(createEditCourseDto.name);
            }
            const thumbnail_link = createEditCourseDto.thumbnail_link;
            if (!thumbnail_link && createEditCourseDto.thumbnail_link) {
                return (0, functions_1.errorResponse)('Thumbnail ID is not valid');
            }
            const cover_image_link = createEditCourseDto.cover_image_link;
            let demo_video;
            if (createEditCourseDto.video_upload_source === coreConstant_1.UPLOAD_SOURCE.LOCAL &&
                createEditCourseDto.demo_video) {
                demo_video = createEditCourseDto.demo_video;
            }
            else {
                demo_video = createEditCourseDto.demo_video;
            }
            if (!demo_video && createEditCourseDto.demo_video) {
                return (0, functions_1.errorResponse)('Demo video is not valid');
            }
            if (createEditCourseDto.discount_status &&
                createEditCourseDto.discount_value <= 0) {
                return (0, functions_1.errorResponse)('Discount value must be greater than 0');
            }
            if (createEditCourseDto.discount_status &&
                createEditCourseDto.discount_type === coreConstant_1.DISCOUNT_TYPE.PERCENTAGE &&
                createEditCourseDto.discount_value > 100) {
                return (0, functions_1.errorResponse)('Discount value must be less than 100');
            }
            let payable_price = createEditCourseDto.price;
            if (createEditCourseDto.discount_status &&
                createEditCourseDto.discount_value) {
                payable_price =
                    createEditCourseDto.price -
                        (0, functions_1.getTotalDiscountAmount)(createEditCourseDto.price, createEditCourseDto.discount_value, createEditCourseDto.discount_type);
                if (payable_price <= 0) {
                    return (0, functions_1.errorResponse)('Decrease Discount Value, because discount price cannot be less than 0!');
                }
            }
            let prepareData = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, createEditCourseDto), { instructorId: user.id }), (slug && { slug })), (payable_price && { payable_price })), (cover_image_link && {
                cover_image_link: cover_image_link,
            })), (demo_video && { demo_video })), (thumbnail_link && { thumbnail_link: thumbnail_link })), (exist && { slug: await (0, functions_1.createSlug)(createEditCourseDto.name) })), (!createEditCourseDto.id && { status: coreConstant_1.coreConstant.STATUS_PENDING }));
            if (edit) {
                console.log({ prepareData });
                const updateCourse = await functions_1.PrismaClient.course.update({
                    where: { id: createEditCourseDto.id },
                    data: prepareData,
                });
                return (0, functions_1.successResponse)('Course updated successfully', updateCourse);
            }
            else {
                const createdCourse = await functions_1.PrismaClient.course.create({
                    data: prepareData,
                });
                return (0, functions_1.successResponse)('Course created successfully', createdCourse);
            }
        }
        catch (error) {
            console.log(error, 'error');
            (0, functions_1.processException)(error);
        }
    }
    async deleteCourse(id, user) {
        try {
            await this.checkCourseExistAndBelongsToUser(id, user.id);
            const findCourse = await functions_1.PrismaClient.course.findUnique({
                where: {
                    id: id,
                },
                include: {
                    Section: {
                        include: {
                            Lesson: true,
                        },
                    },
                    CourseEnrollment: true,
                },
            });
            if (findCourse.CourseEnrollment.length > 0) {
                return (0, functions_1.errorResponse)('Course cannot be deleted because it has enrolled students');
            }
            for (const section of findCourse.Section) {
                for (const lesson of section.Lesson) {
                    await functions_1.PrismaClient.lesson.delete({
                        where: {
                            id: lesson.id,
                        },
                    });
                }
            }
            await functions_1.PrismaClient.section.deleteMany({
                where: {
                    course_id: id,
                },
            });
            const deletedCourse = await functions_1.PrismaClient.course.delete({
                where: {
                    id: id,
                },
            });
            return (0, functions_1.successResponse)('Course and associated sections/lessons deleted successfully', deletedCourse);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getCourseListForAdmin(payload) {
        try {
            const type = payload.type && !isNaN(Number(payload.type))
                ? { status: Number(payload.type) }
                : {};
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            const courseList = await functions_1.PrismaClient.course.findMany(Object.assign({ where: Object.assign({}, type), include: {
                    User: {
                        select: {
                            id: true,
                            first_name: true,
                            last_name: true,
                            email: true,
                        },
                    },
                }, orderBy: {
                    created_at: 'desc',
                } }, paginate));
            courseList.map((course) => {
                var _a, _b, _c;
                (course.thumbnail_link = ((_a = course.thumbnail_link) === null || _a === void 0 ? void 0 : _a.startsWith('http'))
                    ? course.thumbnail_link
                    : (0, functions_1.addPhotoPrefix)(course.thumbnail_link)),
                    (course.cover_image_link = ((_b = course.cover_image_link) === null || _b === void 0 ? void 0 : _b.startsWith('http'))
                        ? course.cover_image_link
                        : (0, functions_1.addPhotoPrefix)(course.cover_image_link)),
                    (course.demo_video = ((_c = course.demo_video) === null || _c === void 0 ? void 0 : _c.startsWith('http'))
                        ? course.demo_video
                        : (0, functions_1.addPhotoPrefix)(course.demo_video));
            });
            const data = {
                list: courseList,
                meta: await (0, functions_1.paginationMetaData)(courseList, payload),
            };
            return (0, functions_1.successResponse)('Course list', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getCourseDetailsForAdmin(id) {
        var _a, _b, _c;
        try {
            let course_details = await functions_1.PrismaClient.course.findFirst({
                where: {
                    id: id,
                },
                include: {
                    category: true,
                    sub_category: true,
                    User: true,
                },
            });
            if (!course_details) {
                return (0, functions_1.errorResponse)('Course not found');
            }
            course_details.thumbnail_link = ((_a = course_details.thumbnail_link) === null || _a === void 0 ? void 0 : _a.startsWith('http'))
                ? course_details.thumbnail_link
                : (0, functions_1.addPhotoPrefix)(course_details.thumbnail_link);
            course_details.cover_image_link =
                ((_b = course_details.cover_image_link) === null || _b === void 0 ? void 0 : _b.startsWith('http'))
                    ? course_details.cover_image_link
                    : (0, functions_1.addPhotoPrefix)(course_details.cover_image_link);
            if (course_details.video_upload_source === coreConstant_1.UPLOAD_SOURCE.LOCAL) {
                course_details.demo_video = ((_c = course_details.demo_video) === null || _c === void 0 ? void 0 : _c.startsWith('http'))
                    ? course_details.demo_video
                    : (0, functions_1.addPhotoPrefix)(course_details.demo_video);
            }
            return (0, functions_1.successResponse)('Courses found Successfully', course_details);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async changeCourseStatusByAdmin(payload) {
        try {
            const courseDetails = await functions_1.PrismaClient.course.findFirst({
                where: {
                    id: payload.course_id,
                },
                include: {
                    User: true,
                },
            });
            if (!courseDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            if (courseDetails.status === coreConstant_1.coreConstant.STATUS_PENDING &&
                payload.status === coreConstant_1.coreConstant.STATUS_ACTIVE) {
                const instructorName = courseDetails.User.first_name + ' ' + courseDetails.User.last_name;
                const notificationTitle = instructorName + ' has been publish a new course.';
                const notificationBody = 'Course name ' +
                    courseDetails.name +
                    '.Course price is ' +
                    courseDetails.price;
                const notificationRedirectUrl = 'redirect_url';
                const followerList = await functions_1.PrismaClient.instructorFollower.findMany({
                    where: {
                        instructorId: courseDetails.instructorId,
                    },
                });
                const userIdArray = followerList.map((follower) => follower.userId);
                await this.notificationService.sendNotificationToAllUser(userIdArray, notificationTitle, notificationBody, notificationRedirectUrl);
            }
            await functions_1.PrismaClient.course.update({
                where: {
                    id: courseDetails.id,
                },
                data: {
                    status: payload.status,
                },
            });
            return (0, functions_1.successResponse)('Course status is changed successfully!');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async createCourseByAdmin(payload) {
        try {
            const edit = payload.id ? true : false;
            let exist;
            if (payload.name) {
                exist = await functions_1.PrismaClient.course.findUnique({
                    where: {
                        name: payload.name,
                    },
                });
            }
            if (!edit && !payload.name) {
                return (0, functions_1.errorResponse)('Please enter course name');
            }
            let category;
            if (payload.category_id) {
                category = await functions_1.PrismaClient.category.findUnique({
                    where: {
                        id: payload.category_id,
                    },
                });
            }
            let sub_category;
            if (payload.sub_category_id) {
                sub_category = await functions_1.PrismaClient.subCategory.findUnique({
                    where: {
                        id: payload.sub_category_id,
                    },
                });
            }
            if (!category && payload.category_id)
                return (0, functions_1.errorResponse)('Category not found!');
            if (!sub_category && payload.sub_category_id)
                return (0, functions_1.errorResponse)('Sub Category not found');
            if (exist && !edit) {
                return (0, functions_1.errorResponse)('Course Name already exist please try another');
            }
            if (payload.discount_status === true && payload.discount_value <= 0) {
                return (0, functions_1.errorResponse)('Discount value must be greater than 0');
            }
            let slug;
            if (payload.name) {
                slug = await (0, functions_1.createSlug)(payload.name);
            }
            const thumbnail_link = payload.thumbnail_link
                ? await functions_1.PrismaClient.myUploads.findFirst({
                    where: {
                        file_path: payload.thumbnail_link,
                    },
                })
                : null;
            const cover_image_link = payload.cover_image_link
                ? await functions_1.PrismaClient.myUploads.findFirst({
                    where: {
                        file_path: payload.cover_image_link,
                    },
                })
                : null;
            let demo_video;
            if (payload.demo_video && !payload.video_upload_source) {
                return (0, functions_1.errorResponse)('Please select video upload source');
            }
            if (payload.video_upload_source === coreConstant_1.UPLOAD_SOURCE.LOCAL &&
                payload.demo_video) {
                let getVideo = await functions_1.PrismaClient.myUploads.findUnique({
                    where: {
                        id: parseInt(payload.demo_video),
                    },
                });
                if (!getVideo) {
                    return (0, functions_1.errorResponse)('Video is not valid');
                }
                demo_video = getVideo.file_path;
            }
            else {
                demo_video = payload.demo_video;
            }
            if (!demo_video && payload.demo_video) {
                return (0, functions_1.errorResponse)('Demo video is not valid');
            }
            if (!thumbnail_link && payload.thumbnail_link) {
                return (0, functions_1.errorResponse)('Thumbnail id is not valid');
            }
            if (!cover_image_link && payload.cover_image_link) {
                return (0, functions_1.errorResponse)('Cover image id is not valid');
            }
            if (payload.discount_status === true && payload.discount_value <= 0) {
                return (0, functions_1.errorResponse)('Discount value must be greater than 0');
            }
            if (payload.discount_status === true &&
                payload.discount_type === coreConstant_1.DISCOUNT_TYPE.PERCENTAGE) {
                if (payload.discount_value > 100) {
                    return (0, functions_1.errorResponse)('Discount value must be less than 100');
                }
            }
            let payable_price = payload.price;
            if (payload.discount_status === true && payload.discount_value) {
                payable_price =
                    payload.price -
                        (0, functions_1.getTotalDiscountAmount)(payload.price, payload.discount_value, payload.discount_type);
            }
            if (payable_price <= 0) {
                return (0, functions_1.errorResponse)('Decrease Discount Value, because discount price can not be less than 0!');
            }
            let prepareData = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, payload), { instructorId: payload.instructorId }), (slug && { slug: slug })), (payable_price && { payable_price: payable_price })), (cover_image_link && {
                cover_image_link: cover_image_link.file_path,
            })), (demo_video && { demo_video: demo_video })), (thumbnail_link && { thumbnail_link: thumbnail_link.file_path })), (exist && { slug: await (0, functions_1.createSlug)(payload.name) })), (!payload.id && { status: coreConstant_1.coreConstant.STATUS_PENDING }));
            if (edit) {
                const updateCourse = await functions_1.PrismaClient.course.update({
                    where: {
                        id: payload.id,
                    },
                    data: prepareData,
                });
                return (0, functions_1.successResponse)('Course updated successfully', updateCourse);
            }
            else {
                const createdCourse = await functions_1.PrismaClient.course.create({
                    data: prepareData,
                });
                return (0, functions_1.successResponse)('Course created successfully', createdCourse);
            }
        }
        catch (error) {
            console.log(error, 'error');
            (0, functions_1.processException)(error);
        }
    }
    async deleteCourseByAdmin(id) {
        try {
            const existCourse = await functions_1.PrismaClient.course.findFirst({
                where: {
                    id: id,
                },
                include: {
                    CourseEnrollment: true,
                    CartItem: true,
                    Quiz: true,
                },
            });
            if (!existCourse) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            if (existCourse.CourseEnrollment.length > 0) {
                return (0, functions_1.errorResponse)('This course is already enrolled, you can not remove this!');
            }
            if (existCourse.CartItem.length > 0) {
                return (0, functions_1.errorResponse)('This course is already added to cart, you can not remove this!');
            }
            if (existCourse.Quiz.length > 0) {
                return (0, functions_1.errorResponse)('Please, remove quiz first to delete this course!');
            }
            await functions_1.PrismaClient.course.delete({
                where: {
                    id: existCourse.id,
                },
            });
            return (0, functions_1.successResponse)('Course is deleted successfully!');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getCourseListPublic(payload) {
        try {
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            let courseIds = [];
            if (payload.min_average_rating) {
                const averageRatingList = await functions_1.PrismaClient.review.groupBy({
                    by: ['course_id'],
                    _avg: {
                        rating: true,
                    },
                });
                courseIds = averageRatingList
                    .filter((review) => review._avg.rating >= payload.min_average_rating)
                    .map((review) => review.course_id);
            }
            const courseLevel = payload.course_level
                ? payload.course_level.split(',').map(Number)
                : [];
            const subCategory = payload.sub_category_id
                ? payload.sub_category_id.split(',').map(Number)
                : [];
            const whereConditions = {
                where: {
                    status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                    private_status: false,
                    OR: [],
                },
            };
            Object.keys(payload).forEach((key) => {
                switch (key) {
                    case 'search':
                        whereConditions.where.OR.push({
                            name: {
                                contains: payload[key],
                            },
                        });
                        break;
                    case 'is_free':
                        whereConditions.where.OR.push({
                            is_free: payload[key] === 'false' ? false : true,
                        });
                        break;
                    case 'discount_status':
                        whereConditions.where.OR.push({
                            discount_status: payload[key] === 'false' ? false : true,
                        });
                        break;
                    case 'course_level':
                        const courseLevelArray = payload[key].split(',').map(Number);
                        whereConditions.where.OR.push({
                            course_level: {
                                in: courseLevelArray,
                            },
                        });
                        break;
                    case 'category_id':
                        whereConditions.where.OR.push({
                            category_id: Number(payload[key]),
                        });
                        break;
                    case 'sub_category_id':
                        const subCategory = payload[key].split(',').map(Number);
                        whereConditions.where.OR.push({
                            sub_category_id: {
                                in: subCategory,
                            },
                        });
                        break;
                    case 'min_price':
                        whereConditions.where.OR.push({
                            price: {
                                gte: parseFloat(payload[key]),
                            },
                        });
                        break;
                    case 'max_price':
                        whereConditions.where.OR.push({
                            price: {
                                lte: parseFloat(payload[key]),
                            },
                        });
                        break;
                    case 'min_duration':
                        whereConditions.where.OR.push({
                            duration: {
                                gte: Number(payload[key]),
                            },
                        });
                        break;
                    case 'max_duration':
                        whereConditions.where.OR.push({
                            duration: {
                                lte: Number(payload[key]),
                            },
                        });
                        break;
                    default:
                        break;
                }
            });
            if (courseIds.length > 0) {
                whereConditions.where.OR.push({
                    id: {
                        in: courseIds,
                    },
                });
            }
            const finalWhereCondition = {
                where: {
                    status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                    private_status: false,
                    AND: whereConditions.where.OR,
                },
            };
            let sortBy = {};
            if (payload.sort_by) {
                if (payload.sort_by === 'latest') {
                    sortBy = {
                        orderBy: {
                            created_at: 'desc',
                        },
                    };
                }
                else if (payload.sort_by === 'price_high_to_low') {
                    sortBy = {
                        orderBy: {
                            price: 'desc',
                        },
                    };
                }
                else if (payload.sort_by === 'price_low_to_high') {
                    sortBy = {
                        orderBy: {
                            price: 'asc',
                        },
                    };
                }
            }
            else {
                sortBy = {
                    orderBy: {
                        created_at: 'desc',
                    },
                };
            }
            const courseList = await functions_1.PrismaClient.course.findMany(Object.assign(Object.assign(Object.assign(Object.assign({}, finalWhereCondition), { include: {
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
                } }), sortBy), paginate));
            const coursesWithLessonCount = await Promise.all(courseList.map(async (course) => {
                var _a, _b, _c;
                course['lession_count'] = course.Lesson.length;
                course.thumbnail_link = ((_a = course.thumbnail_link) === null || _a === void 0 ? void 0 : _a.startsWith('http'))
                    ? course.thumbnail_link
                    : (0, functions_1.addPhotoPrefix)(course.thumbnail_link);
                course.cover_image_link = ((_b = course.cover_image_link) === null || _b === void 0 ? void 0 : _b.startsWith('http'))
                    ? course.cover_image_link
                    : (0, functions_1.addPhotoPrefix)(course.cover_image_link);
                course.demo_video = ((_c = course.demo_video) === null || _c === void 0 ? void 0 : _c.startsWith('http'))
                    ? course.demo_video
                    : (0, functions_1.addPhotoPrefix)(course.demo_video);
                course.User.photo = course.User.photo
                    ? (0, functions_1.addPhotoPrefix)(course.User.photo)
                    : course.User.photo;
                const totalRating = course.Review.reduce((sum, review) => sum + review.rating, 0);
                const averageRating = totalRating / course.Review.length || 0;
                course['average_rating'] = averageRating;
                delete course.Lesson;
                delete course.Review;
                return {
                    course,
                };
            }));
            const paginationMetaCondition = Object.assign({ status: coreConstant_1.coreConstant.STATUS_ACTIVE, private_status: false }, (whereConditions.where.OR.length > 0
                ? { AND: whereConditions.where.OR }
                : {}));
            const data = {
                list: coursesWithLessonCount,
                meta: await (0, functions_1.paginationMetaData)('course', payload, paginationMetaCondition),
            };
            return (0, functions_1.successResponse)('Public course list', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getCourseFilterDataPublic() {
        try {
            const categoryList = await functions_1.PrismaClient.category.findMany({
                where: {
                    status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                },
                include: {
                    SubCategory: {
                        include: {
                            Course: true,
                        },
                    },
                    Course: true,
                },
            });
            categoryList.map((category) => {
                category['course_count'] = category.Course.length;
                category.SubCategory.map((subcategory) => {
                    subcategory['course_count'] = subcategory.Course.length;
                    delete subcategory.Course;
                });
                delete category.Course;
            });
            const reviewList = await functions_1.PrismaClient.review.groupBy({
                by: ['rating'],
                _count: {
                    rating: true,
                },
            });
            const modifiedReviewList = reviewList.map((review) => {
                return { rating: review.rating, total: review._count.rating };
            });
            const data = {
                category_list: categoryList,
                rating_list: modifiedReviewList,
            };
            return (0, functions_1.successResponse)('Course list page filter data', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getCourseDetailsPublic(course_slug) {
        var _a, _b, _c;
        try {
            const courseDetails = await functions_1.PrismaClient.course.findFirst({
                where: {
                    slug: course_slug,
                },
                include: {
                    category: true,
                    sub_category: true,
                    Review: true,
                    Section: {
                        include: {
                            Lesson: true,
                            Quiz: true,
                        },
                    },
                    Quiz: true,
                    User: {
                        select: {
                            id: true,
                            first_name: true,
                            last_name: true,
                            photo: true,
                            user_name: true,
                        },
                    },
                    CourseEnrollment: {
                        select: {
                            id: true,
                        },
                    },
                },
            });
            if (!courseDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            courseDetails.thumbnail_link = ((_a = courseDetails.thumbnail_link) === null || _a === void 0 ? void 0 : _a.startsWith('http'))
                ? courseDetails.thumbnail_link
                : (0, functions_1.addPhotoPrefix)(courseDetails.thumbnail_link);
            courseDetails.cover_image_link =
                ((_b = courseDetails.cover_image_link) === null || _b === void 0 ? void 0 : _b.startsWith('http'))
                    ? courseDetails.cover_image_link
                    : (0, functions_1.addPhotoPrefix)(courseDetails.cover_image_link);
            courseDetails.demo_video = ((_c = courseDetails.demo_video) === null || _c === void 0 ? void 0 : _c.startsWith('http'))
                ? courseDetails.demo_video
                : (0, functions_1.addPhotoPrefix)(courseDetails.demo_video);
            courseDetails.User.photo = courseDetails.User.photo
                ? (0, functions_1.addPhotoPrefix)(courseDetails.User.photo)
                : courseDetails.User.photo;
            const totalRating = courseDetails.Review.reduce((sum, review) => sum + review.rating, 0);
            const totalReviews = courseDetails.Review.length;
            const averageRating = totalRating / totalReviews || 0;
            const totalLessons = courseDetails.Section.reduce((sum, section) => sum + section.Lesson.length, 0);
            const totalStudents = courseDetails.CourseEnrollment.length;
            courseDetails['total_lessons'] = totalLessons;
            courseDetails['average_rating'] = averageRating;
            courseDetails['total_section'] = courseDetails.Section.length;
            courseDetails['total_quiz'] = courseDetails.Quiz.length;
            courseDetails['averageRating'] = averageRating;
            courseDetails['totalReviews'] = totalReviews;
            courseDetails['total_students'] = totalStudents;
            courseDetails.Section.map((section) => {
                section.Lesson.map((lession) => {
                    delete lession.video_url;
                });
            });
            delete courseDetails.Quiz;
            return (0, functions_1.successResponse)('Course details public', courseDetails);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getEnrolledCourses(user, payload) {
        try {
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            const whereConditions = {
                user_id: user.id,
            };
            const enrolledCourses = await functions_1.PrismaClient.courseEnrollment.findMany(Object.assign({ where: whereConditions, include: {
                    course: true,
                } }, paginate));
            if (!enrolledCourses || enrolledCourses.length === 0) {
                return (0, functions_1.errorResponse)('User has not enrolled in any courses yet.');
            }
            const formattedCourses = enrolledCourses.map((enrollment) => (0, functions_1.processCourseLinks)(enrollment.course));
            const paginationMeta = await (0, functions_1.paginationMetaData)('courseEnrollment', payload, whereConditions);
            const data = {
                list: formattedCourses,
                meta: paginationMeta,
            };
            return (0, functions_1.successResponse)('Enrolled courses retrieved successfully.', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async checkCourseEnrollment(course_id, user) {
        try {
            const courseEnrollment = await functions_1.PrismaClient.courseEnrollment.findFirst({
                where: {
                    course_id,
                    user_id: user.id,
                },
            });
            if (!courseEnrollment) {
                return (0, functions_1.errorResponse)('User has not enrolled in this course yet.');
            }
            return (0, functions_1.successResponse)('User has enrolled in this course.');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getEnrolledCourseDetails(user, course_id) {
        var _a, _b, _c;
        try {
            const checkEnrolledCourse = await functions_1.PrismaClient.courseEnrollment.findFirst({
                where: {
                    user_id: user.id,
                    course_id: course_id,
                },
            });
            if (!checkEnrolledCourse) {
                return (0, functions_1.errorResponse)('This course is not enrolled yet!');
            }
            const courseDetails = await functions_1.PrismaClient.course.findFirst({
                where: {
                    id: course_id,
                },
                include: {
                    category: true,
                    sub_category: true,
                    Review: true,
                    LiveClass: {
                        where: {
                            OR: [
                                { status: coreConstant_1.LiveCLassStatus.LIVE },
                                { status: coreConstant_1.LiveCLassStatus.UPCOMING },
                            ],
                        },
                    },
                    Section: {
                        include: {
                            Lesson: {
                                include: {
                                    UserLession: {
                                        where: {
                                            userId: user.id,
                                        },
                                    },
                                },
                            },
                            Quiz: {
                                include: {
                                    UserQuiz: {
                                        where: {
                                            is_completed: 1,
                                        },
                                    },
                                },
                            },
                        },
                    },
                    Quiz: true,
                    User: {
                        select: {
                            id: true,
                            first_name: true,
                            last_name: true,
                            photo: true,
                        },
                    },
                    CourseEnrollment: {
                        select: {
                            id: true,
                        },
                    },
                },
            });
            if (!courseDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            courseDetails.thumbnail_link = ((_a = courseDetails.thumbnail_link) === null || _a === void 0 ? void 0 : _a.startsWith('http'))
                ? courseDetails.thumbnail_link
                : (0, functions_1.addPhotoPrefix)(courseDetails.thumbnail_link);
            courseDetails.cover_image_link =
                ((_b = courseDetails.cover_image_link) === null || _b === void 0 ? void 0 : _b.startsWith('http'))
                    ? courseDetails.cover_image_link
                    : (0, functions_1.addPhotoPrefix)(courseDetails.cover_image_link);
            if (courseDetails.video_upload_source === coreConstant_1.UPLOAD_SOURCE.LOCAL) {
                courseDetails.demo_video = ((_c = courseDetails.demo_video) === null || _c === void 0 ? void 0 : _c.startsWith('http'))
                    ? courseDetails.demo_video
                    : (0, functions_1.addPhotoPrefix)(courseDetails.demo_video);
            }
            courseDetails.Section.map((section) => {
                section.Lesson.map((lession) => {
                    var _a;
                    lession['is_completed'] =
                        lession.UserLession.length > 0
                            ? lession.UserLession[0].is_completed
                            : false;
                    delete lession.UserLession;
                    lession.video_url = ((_a = lession.video_url) === null || _a === void 0 ? void 0 : _a.startsWith('http'))
                        ? lession.video_url
                        : (0, functions_1.addPhotoPrefix)(lession.video_url);
                });
                section.Quiz.map((quiz) => {
                    quiz['is_completed'] =
                        quiz.UserQuiz.length > 0 ? quiz.UserQuiz[0].is_completed : false;
                    delete quiz.UserQuiz;
                });
            });
            courseDetails.User.photo = courseDetails.User.photo
                ? (0, functions_1.addPhotoPrefix)(courseDetails.User.photo)
                : courseDetails.User.photo;
            const totalRating = courseDetails.Review.reduce((sum, review) => sum + review.rating, 0);
            const totalReviews = courseDetails.Review.length;
            const averageRating = totalRating / totalReviews || 0;
            const totalLessons = courseDetails.Section.reduce((sum, section) => sum + section.Lesson.length, 0);
            const totalStudents = courseDetails.CourseEnrollment.length;
            const totalCompleteLessionList = await functions_1.PrismaClient.userLession.findMany({
                where: {
                    userId: user.id,
                    courseId: courseDetails.id,
                    is_completed: true,
                },
            });
            const userCompletedQuizList = await functions_1.PrismaClient.userQuiz.groupBy({
                by: ['quizId'],
                where: {
                    studentId: user.id,
                    courseId: courseDetails.id,
                    is_completed: coreConstant_1.coreConstant.STATUS_ACTIVE,
                },
            });
            const totalCompletePercentage = ((totalCompleteLessionList.length + userCompletedQuizList.length) *
                100) /
                (totalLessons + courseDetails.Quiz.length);
            courseDetails['total_lessons'] = totalLessons;
            courseDetails['average_rating'] = averageRating;
            courseDetails['total_section'] = courseDetails.Section.length;
            courseDetails['total_quiz'] = courseDetails.Quiz.length;
            courseDetails['averageRating'] = averageRating;
            courseDetails['totalReviews'] = totalReviews;
            courseDetails['total_students'] = totalStudents;
            courseDetails['total_complete_percentage'] =
                totalCompletePercentage.toFixed(2);
            delete courseDetails.Quiz;
            return (0, functions_1.successResponse)('Course details public', courseDetails);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getCourseReviewDataPublic(course_id) {
        try {
            const courseDetails = await functions_1.PrismaClient.course.findFirst({
                where: {
                    id: course_id,
                },
            });
            if (!courseDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            const reviewList = await functions_1.PrismaClient.review.findMany({
                where: {
                    course_id: courseDetails.id,
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            first_name: true,
                            last_name: true,
                            photo: true,
                        },
                    },
                },
            });
            let totalRating = 0;
            reviewList.map((review) => {
                totalRating = totalRating + review.rating;
                review.user.photo = review.user.photo
                    ? (0, functions_1.addPhotoPrefix)(review.user.photo)
                    : review.user.photo;
            });
            const averageRating = reviewList.length > 0
                ? (totalRating / reviewList.length).toFixed(2)
                : 0;
            const reviewListByratingGroup = await functions_1.PrismaClient.review.groupBy({
                where: {
                    course_id: courseDetails.id,
                },
                by: ['rating'],
                _count: {
                    rating: true,
                },
            });
            const modifiedReviewList = reviewListByratingGroup.map((review) => {
                const rating = review.rating;
                const total = review._count.rating;
                const percentage = ((total * 100) / reviewList.length).toFixed(2);
                return { rating, total, percentage };
            });
            const data = {
                review_list: reviewList,
                total_review_data: {
                    average_rating: averageRating,
                    rating_groupBy: modifiedReviewList,
                },
            };
            return (0, functions_1.successResponse)('Course review details!', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getAllCourseReport(payload) {
        try {
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            const courseList = await functions_1.PrismaClient.course.findMany(Object.assign({ include: {
                    CourseEnrollment: true,
                    Review: true,
                    User: {
                        select: {
                            id: true,
                            first_name: true,
                            last_name: true,
                            email: true,
                            phone: true,
                        },
                    },
                } }, paginate));
            courseList.map((course) => {
                var _a, _b;
                let totalCompleted = 0;
                course.CourseEnrollment.map((courseEnroll) => {
                    if (course.id === courseEnroll.course_id &&
                        courseEnroll.is_completed) {
                        totalCompleted++;
                    }
                });
                course.thumbnail_link = ((_a = course.thumbnail_link) === null || _a === void 0 ? void 0 : _a.startsWith('http'))
                    ? course.thumbnail_link
                    : (0, functions_1.addPhotoPrefix)(course.thumbnail_link);
                course.cover_image_link = ((_b = course.cover_image_link) === null || _b === void 0 ? void 0 : _b.startsWith('http'))
                    ? course.cover_image_link
                    : (0, functions_1.addPhotoPrefix)(course.cover_image_link);
                course['total_enrolled'] = course.CourseEnrollment.length;
                course['completed_course'] = totalCompleted;
                course['total_review'] = course.Review.length;
                delete course.CourseEnrollment;
                delete course.Review;
            });
            const paginationMeta = await (0, functions_1.paginationMetaData)('course', payload);
            const data = {
                list: courseList,
                meta: paginationMeta,
            };
            return (0, functions_1.successResponse)('Course report', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getCourseListBySearch(payload) {
        var _a;
        try {
            const courseList = await functions_1.PrismaClient.course.findMany({
                where: {
                    status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                    OR: {
                        name: {
                            contains: (_a = payload.search) !== null && _a !== void 0 ? _a : '',
                        },
                    },
                },
            });
            courseList.map((course) => {
                var _a;
                course.thumbnail_link = ((_a = course.thumbnail_link) === null || _a === void 0 ? void 0 : _a.startsWith('http'))
                    ? course.thumbnail_link
                    : (0, functions_1.addPhotoPrefix)(course.thumbnail_link);
            });
            return (0, functions_1.successResponse)('Course list by search!', courseList);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
};
CourseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], CourseService);
exports.CourseService = CourseService;
//# sourceMappingURL=course.service.js.map