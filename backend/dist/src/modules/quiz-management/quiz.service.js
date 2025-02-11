"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizService = void 0;
const common_1 = require("@nestjs/common");
const functions_1 = require("../../shared/helpers/functions");
const coreConstant_1 = require("../../shared/helpers/coreConstant");
let QuizService = class QuizService {
    async createQuizByInstructor(user, payload) {
        var _a;
        try {
            const existsCourse = await functions_1.PrismaClient.course.findFirst({
                where: {
                    id: payload.course_id,
                    instructorId: user.id,
                    Section: {
                        some: {
                            id: payload.section_id,
                        },
                    },
                },
            });
            if (!existsCourse) {
                return (0, functions_1.errorResponse)('Invalid Course!');
            }
            if (payload.display_limited_qus === coreConstant_1.coreConstant.STATUS_ACTIVE &&
                !payload.qus_limit) {
                return (0, functions_1.errorResponse)('Question limited is required!');
            }
            const quizDetails = await functions_1.PrismaClient.quiz.create({
                data: {
                    courseId: payload.course_id,
                    sectionId: payload.section_id,
                    userId: user.id,
                    title: payload.title,
                    time: payload.time,
                    max_attempts: payload.max_attempts,
                    pass_mark: payload.pass_mark,
                    expiry_days: payload.expiry_days,
                    display_qus_randomly: payload.display_qus_randomly,
                    display_limited_qus: payload.display_limited_qus,
                    qus_limit: (_a = payload.qus_limit) !== null && _a !== void 0 ? _a : 0,
                    certificate_included: payload.certificate_included,
                    status: payload.status,
                },
            });
            return (0, functions_1.successResponse)('Quiz is created successfully!', quizDetails);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getQuizListForInstructor(user, course_id, payload) {
        try {
            const whereCondition = {
                userId: user.id,
                courseId: course_id,
            };
            const quizList = await functions_1.PrismaClient.quiz.findMany({
                where: whereCondition,
                include: {
                    QuizQuestion: true,
                },
                orderBy: {
                    created_at: 'desc',
                },
            });
            quizList.map((item) => {
                item['total_question'] = item.QuizQuestion.length;
                delete item.QuizQuestion;
            });
            const data = {
                list: quizList,
            };
            return (0, functions_1.successResponse)('Quiz list for instructor!', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getQuizDetails(quize_id, user) {
        try {
            const quizDetails = await functions_1.PrismaClient.quiz.findFirst({
                where: {
                    id: quize_id,
                    userId: user.id,
                },
            });
            if (!quizDetails)
                return (0, functions_1.errorResponse)('Invalid Request!');
            return (0, functions_1.successResponse)('Quize details', quizDetails);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async updateQuizByInstructor(user, id, payload) {
        var _a;
        try {
            const existsQuiz = await functions_1.PrismaClient.quiz.findFirst({
                where: {
                    id: id,
                    userId: user.id,
                },
            });
            if (!existsQuiz)
                return (0, functions_1.errorResponse)('Invalid Request!');
            const existsCourse = await functions_1.PrismaClient.course.findFirst({
                where: {
                    id: payload.course_id,
                    instructorId: user.id,
                    Section: {
                        some: {
                            id: payload.section_id,
                        },
                    },
                },
            });
            if (!existsCourse) {
                return (0, functions_1.errorResponse)('Invalid Course!');
            }
            if (payload.display_limited_qus === coreConstant_1.coreConstant.STATUS_ACTIVE &&
                !payload.qus_limit) {
                return (0, functions_1.errorResponse)('Question limited is required!');
            }
            const quizeDetails = await functions_1.PrismaClient.quiz.update({
                where: {
                    id: existsQuiz.id,
                },
                data: {
                    courseId: payload.course_id,
                    sectionId: payload.section_id,
                    userId: user.id,
                    title: payload.title,
                    time: payload.time,
                    max_attempts: payload.max_attempts,
                    pass_mark: payload.pass_mark,
                    expiry_days: payload.expiry_days,
                    display_qus_randomly: payload.display_qus_randomly,
                    display_limited_qus: payload.display_limited_qus,
                    qus_limit: (_a = payload.qus_limit) !== null && _a !== void 0 ? _a : 0,
                    certificate_included: payload.certificate_included,
                    status: payload.status,
                },
            });
            return (0, functions_1.successResponse)('Quiz is updated successfully!', quizeDetails);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async deleteQuizDetailsByInstructor(user, quiz_id) {
        try {
            const existsQuiz = await functions_1.PrismaClient.quiz.findFirst({
                where: {
                    id: quiz_id,
                    userId: user.id,
                },
            });
            if (!existsQuiz)
                return (0, functions_1.errorResponse)('Invalid request!');
            const checkQuizAttend = await functions_1.PrismaClient.userQuiz.findMany({
                where: {
                    quizId: existsQuiz.id,
                },
            });
            if (checkQuizAttend) {
                return (0, functions_1.errorResponse)('This quiz is already attend, you can not delete this!');
            }
            await functions_1.PrismaClient.quiz.delete({
                where: {
                    id: existsQuiz.id,
                },
            });
            return (0, functions_1.successResponse)('Quiz details is removed successfully!');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async createQuizQuestionByInstructor(user, payload) {
        try {
            const quizDetails = await functions_1.PrismaClient.quiz.findFirst({
                where: {
                    id: payload.quiz_id,
                    courseId: payload.course_id,
                    userId: user.id,
                },
            });
            if (!quizDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            if (payload.file_type !== coreConstant_1.FileTypeConstant.NONE && !payload.file_url) {
                return (0, functions_1.errorResponse)('Please, insert a image or video!');
            }
            const file_url = payload.file_url
                ? await (0, functions_1.fetchMyUploadFilePathById)(undefined, payload.file_url)
                : null;
            const quizQuestion = await functions_1.PrismaClient.quizQuestion.create({
                data: {
                    title: payload.title,
                    mark: payload.mark,
                    file_type: payload.file_type,
                    file_url: file_url,
                    courseId: quizDetails.courseId,
                    quizId: quizDetails.id,
                    userId: user.id,
                },
            });
            return (0, functions_1.successResponse)('Question is created successfully!', quizQuestion);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getQuizQuestionList(user, quiz_id, payload) {
        try {
            const questionList = await functions_1.PrismaClient.quizQuestion.findMany({
                where: {
                    userId: user.id,
                    quizId: quiz_id,
                },
            });
            return (0, functions_1.successResponse)('Quiz question list', questionList);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getQuizQuestionDetails(user, quiz_question_id) {
        try {
            const questionDetails = await functions_1.PrismaClient.quizQuestion.findFirst({
                where: {
                    id: quiz_question_id,
                    userId: user.id,
                },
            });
            if (!questionDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            return (0, functions_1.successResponse)('Quiz question details', questionDetails);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async updateQuizQuestionByInstructor(user, quiz_question_id, payload) {
        try {
            const existsQuizQuestion = await functions_1.PrismaClient.quizQuestion.findFirst({
                where: {
                    id: quiz_question_id,
                    userId: user.id,
                },
            });
            if (!existsQuizQuestion) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            const quizDetails = await functions_1.PrismaClient.quiz.findFirst({
                where: {
                    id: payload.quiz_id,
                    courseId: payload.course_id,
                    userId: user.id,
                },
            });
            if (!quizDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            if (payload.file_type !== coreConstant_1.FileTypeConstant.NONE && !payload.file_url) {
                return (0, functions_1.errorResponse)('Please, insert a image or video!');
            }
            const file_url = payload.file_url
                ? await (0, functions_1.fetchMyUploadFilePathById)(undefined, payload.file_url)
                : existsQuizQuestion.file_url;
            const quizQuestion = await functions_1.PrismaClient.quizQuestion.update({
                where: {
                    id: existsQuizQuestion.id,
                },
                data: {
                    title: payload.title,
                    mark: payload.mark,
                    file_type: payload.file_type,
                    file_url: file_url,
                    courseId: quizDetails.courseId,
                    quizId: quizDetails.id,
                    userId: user.id,
                },
            });
            return (0, functions_1.successResponse)('Question is updated successfully!', quizQuestion);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async deleteQuizQuestion(user, quiz_question_id) {
        try {
            const questionDetails = await functions_1.PrismaClient.quizQuestion.findFirst({
                where: {
                    id: quiz_question_id,
                    userId: user.id,
                },
            });
            if (!questionDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            const checkQuizAttend = await functions_1.PrismaClient.userQuizAnswer.findMany({
                where: {
                    quizQuestionId: questionDetails.id,
                },
            });
            if (checkQuizAttend) {
                return (0, functions_1.errorResponse)('This quiz question answer is already attend, you can not delete this!');
            }
            await functions_1.PrismaClient.quizQuestion.delete({
                where: {
                    id: questionDetails.id,
                },
            });
            return (0, functions_1.successResponse)('Quiz question is deleted successfully!');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async createQuestionAnswer(user, payload) {
        try {
            const existsQuestion = await functions_1.PrismaClient.quizQuestion.findFirst({
                where: {
                    id: payload.quiz_question_id,
                    quizId: payload.quiz_id,
                    userId: user.id,
                },
            });
            if (!existsQuestion) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            const file_url = payload.file_url
                ? await (0, functions_1.fetchMyUploadFilePathById)(undefined, payload.file_url)
                : null;
            const answerDetails = await functions_1.PrismaClient.quizQuestionAnswer.create({
                data: {
                    title: payload.title,
                    is_correct: payload.is_correct,
                    file_url: file_url,
                    quizId: existsQuestion.quizId,
                    quizQuestionId: existsQuestion.id,
                    userId: user.id,
                },
            });
            return (0, functions_1.successResponse)('Answer is created successfully!', answerDetails);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getQuizQuestionAnswerList(user, quiz_question_id) {
        try {
            const answerList = await functions_1.PrismaClient.quizQuestionAnswer.findMany({
                where: {
                    quizQuestionId: quiz_question_id,
                    userId: user.id,
                },
                orderBy: {
                    created_at: 'desc',
                },
            });
            return (0, functions_1.successResponse)('Question answer list', answerList);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getQuizQuestionAnswerDetails(user, quiz_question_answer_id) {
        try {
            const answerDetails = await functions_1.PrismaClient.quizQuestionAnswer.findFirst({
                where: {
                    id: quiz_question_answer_id,
                    userId: user.id,
                },
            });
            if (!answerDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            return (0, functions_1.successResponse)('Quiz question answer details', answerDetails);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async updateQuestionAnswer(user, quiz_question_answer_id, payload) {
        try {
            const existsQuestionAnswer = await functions_1.PrismaClient.quizQuestionAnswer.findFirst({
                where: {
                    id: quiz_question_answer_id,
                    userId: user.id,
                },
            });
            if (!existsQuestionAnswer) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            const existsQuestion = await functions_1.PrismaClient.quizQuestion.findFirst({
                where: {
                    id: payload.quiz_question_id,
                    quizId: payload.quiz_id,
                    userId: user.id,
                },
            });
            if (!existsQuestion) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            const file_url = payload.file_url
                ? await (0, functions_1.fetchMyUploadFilePathById)(undefined, payload.file_url)
                : existsQuestionAnswer.file_url;
            const answerDetails = await functions_1.PrismaClient.quizQuestionAnswer.update({
                where: {
                    id: existsQuestionAnswer.id,
                },
                data: {
                    title: payload.title,
                    is_correct: payload.is_correct,
                    file_url: file_url,
                    quizId: existsQuestion.quizId,
                    quizQuestionId: existsQuestion.id,
                    userId: user.id,
                },
            });
            return (0, functions_1.successResponse)('Answer is updated successfully!', answerDetails);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async deleteQuizQuestionAnswer(user, quiz_question_answer_id) {
        try {
            const answerDetails = await functions_1.PrismaClient.quizQuestionAnswer.findFirst({
                where: {
                    id: quiz_question_answer_id,
                    userId: user.id,
                },
            });
            if (!answerDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            const checkQuizAttend = await functions_1.PrismaClient.userQuizAnswer.findMany({
                where: {
                    quizQuestionId: answerDetails.quizQuestionId,
                },
            });
            if (checkQuizAttend) {
                return (0, functions_1.errorResponse)('This quiz question answer is already attend, you can not delete this!');
            }
            await functions_1.PrismaClient.quizQuestionAnswer.delete({
                where: {
                    id: answerDetails.id,
                },
            });
            return (0, functions_1.successResponse)('Quiz question answer is deleted successfully!');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getQuizQuestionAnswerDetailsForStudent(user, quiz_id) {
        try {
            const quizDetails = await functions_1.PrismaClient.quiz.findFirst({
                where: {
                    id: quiz_id,
                    status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                },
                include: {
                    QuizQuestion: true,
                },
            });
            if (!quizDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            const existsCourseEnrollment = await functions_1.PrismaClient.courseEnrollment.findFirst({
                where: {
                    course_id: quizDetails.courseId,
                    user_id: user.id,
                },
            });
            if (!existsCourseEnrollment) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            quizDetails['total_question'] = quizDetails.QuizQuestion.length;
            delete quizDetails.QuizQuestion;
            return (0, functions_1.successResponse)('Quiz details', quizDetails);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getQuizQuestionSequentially(payload, whereCondition = {}) {
        const paginate = await (0, functions_1.paginatioOptions)(payload);
        const questionList = await functions_1.PrismaClient.quizQuestion.findMany(Object.assign({ where: whereCondition, include: {
                QuizQuestionAnswer: {
                    select: {
                        id: true,
                        title: true,
                        file_url: true,
                    },
                },
            } }, paginate));
        const data = {
            list: questionList,
            meta: await (0, functions_1.paginationMetaData)('quizQuestion', payload, whereCondition),
        };
        return (0, functions_1.successResponse)('Quiz question list sequentially!', data);
    }
    async getQuizQuestionRandomly(payload, whereCondition) {
        const totalItems = await functions_1.PrismaClient.quizQuestion.count({
            where: whereCondition,
        });
        const paginate = await (0, functions_1.paginatioOptionsRandomly)(totalItems, payload);
        const questionList = await functions_1.PrismaClient.quizQuestion.findMany(Object.assign({ where: whereCondition, include: {
                QuizQuestionAnswer: {
                    select: {
                        id: true,
                        title: true,
                        file_url: true,
                    },
                },
            } }, paginate));
        const data = {
            list: questionList,
            meta: await (0, functions_1.paginationMetaDataRandomly)(totalItems, paginate.skip + 1, payload),
        };
        return (0, functions_1.successResponse)('Quiz question list randomly!', data);
    }
    async getQuizQuestionListForUser(user, quiz_id, payload) {
        try {
            const quizDetails = await functions_1.PrismaClient.quiz.findFirst({
                where: {
                    id: quiz_id,
                    status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                },
            });
            if (!quizDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            const existsCourseEnrollment = await functions_1.PrismaClient.courseEnrollment.findFirst({
                where: {
                    course_id: quizDetails.courseId,
                    user_id: user.id,
                },
            });
            if (!existsCourseEnrollment) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            const whereCondition = {
                quizId: quizDetails.id,
            };
            if (!payload.visited_offset) {
                const countAttempts = await functions_1.PrismaClient.userQuiz.count({
                    where: {
                        studentId: user.id,
                        quizId: quizDetails.id,
                        courseId: quizDetails.courseId,
                    },
                });
                if (countAttempts < quizDetails.max_attempts ||
                    quizDetails.max_attempts === 0) {
                    await functions_1.PrismaClient.userQuiz.create({
                        data: {
                            studentId: user.id,
                            instructorId: quizDetails.userId,
                            quizId: quizDetails.id,
                            courseId: quizDetails.courseId,
                            pass_mark: quizDetails.pass_mark,
                        },
                    });
                }
                else {
                    return (0, functions_1.errorResponse)('Your quiz max attempts limit is over!');
                }
            }
            if (quizDetails.display_qus_randomly === coreConstant_1.coreConstant.STATUS_ACTIVE) {
                const response = await this.getQuizQuestionRandomly(payload, whereCondition);
                return response;
            }
            else {
                const response = await this.getQuizQuestionSequentially(payload, whereCondition);
                return response;
            }
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async saveQuizQuestionAnswerByUser(user, payload) {
        try {
            const existsQuizQuestion = await functions_1.PrismaClient.quizQuestion.findFirst({
                where: {
                    id: payload.quiz_question_id,
                    quizId: payload.quiz_id,
                },
            });
            if (!existsQuizQuestion) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            const userLastAttemptsQuiz = await functions_1.PrismaClient.userQuiz.findFirst({
                where: {
                    studentId: user.id,
                    quizId: existsQuizQuestion.quizId,
                },
                orderBy: {
                    created_at: 'desc',
                },
            });
            if (!userLastAttemptsQuiz) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            if (userLastAttemptsQuiz.is_completed) {
                return (0, functions_1.errorResponse)('You already completed this quiz!');
            }
            const givenAnswerArray = payload.answer.split(',').map(Number);
            const questionAnswerList = await functions_1.PrismaClient.quizQuestionAnswer.findMany({
                where: {
                    is_correct: coreConstant_1.AnswerStatusConstant.RIGHT_ANSWER,
                    quizId: existsQuizQuestion.quizId,
                    quizQuestionId: existsQuizQuestion.id,
                    userId: existsQuizQuestion.userId,
                },
            });
            const questionAnswerArray = questionAnswerList.map((item) => item.id);
            const isEqual = await (0, functions_1.checkTwoArraysAreEqual)(questionAnswerArray, givenAnswerArray);
            const checkAlreadyAnswer = await functions_1.PrismaClient.userQuizAnswer.findFirst({
                where: {
                    studentId: user.id,
                    quizId: existsQuizQuestion.quizId,
                    quizQuestionId: existsQuizQuestion.id,
                    userQuizId: userLastAttemptsQuiz.id,
                },
                orderBy: {
                    created_at: 'desc',
                },
            });
            if (checkAlreadyAnswer) {
                await functions_1.PrismaClient.userQuizAnswer.update({
                    where: {
                        id: checkAlreadyAnswer.id,
                    },
                    data: {
                        answer: payload.answer,
                        mark: isEqual ? existsQuizQuestion.mark : 0,
                        is_correct: isEqual
                            ? coreConstant_1.AnswerStatusConstant.RIGHT_ANSWER
                            : coreConstant_1.AnswerStatusConstant.WRONG_ANSWER,
                    },
                });
            }
            else {
                await functions_1.PrismaClient.userQuizAnswer.create({
                    data: {
                        studentId: user.id,
                        quizId: existsQuizQuestion.quizId,
                        quizQuestionId: existsQuizQuestion.id,
                        userQuizId: userLastAttemptsQuiz.id,
                        answer: payload.answer,
                        mark: isEqual ? existsQuizQuestion.mark : 0,
                        is_correct: isEqual
                            ? coreConstant_1.AnswerStatusConstant.RIGHT_ANSWER
                            : coreConstant_1.AnswerStatusConstant.WRONG_ANSWER,
                    },
                });
            }
            const totalQuestionMark = await functions_1.PrismaClient.quizQuestion.aggregate({
                where: {
                    quizId: existsQuizQuestion.quizId,
                },
                _sum: {
                    mark: true,
                },
            });
            const totalRightAnswerMark = await functions_1.PrismaClient.userQuizAnswer.aggregate({
                where: {
                    studentId: user.id,
                    quizId: existsQuizQuestion.quizId,
                    userQuizId: userLastAttemptsQuiz.id,
                    is_correct: coreConstant_1.AnswerStatusConstant.RIGHT_ANSWER,
                },
                _sum: {
                    mark: true,
                },
            });
            const isDone = totalQuestionMark._sum.mark === totalRightAnswerMark._sum.mark
                ? true
                : false;
            await functions_1.PrismaClient.userQuiz.update({
                where: {
                    id: userLastAttemptsQuiz.id,
                },
                data: {
                    total_marks: totalRightAnswerMark._sum.mark || 0,
                    is_completed: isDone ? 1 : 0,
                },
            });
            return (0, functions_1.successResponse)('Question is saved!');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getQuizResultDetailsForUser(user, quiz_id) {
        try {
            const quizDetails = await functions_1.PrismaClient.quiz.findFirst({
                where: {
                    id: quiz_id,
                    status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                },
                include: {
                    QuizQuestion: true,
                },
            });
            if (!quizDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            const existsCourseEnrollment = await functions_1.PrismaClient.courseEnrollment.findFirst({
                where: {
                    course_id: quizDetails.courseId,
                    user_id: user.id,
                },
            });
            if (!existsCourseEnrollment) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            const userQuizDetails = await functions_1.PrismaClient.userQuiz.findFirst({
                where: {
                    quizId: quizDetails.id,
                    studentId: user.id,
                },
                orderBy: {
                    created_at: 'desc',
                },
            });
            const courseDetails = await functions_1.PrismaClient.course.findFirst({
                where: {
                    id: quizDetails.courseId,
                },
                include: {
                    Lesson: true,
                    Quiz: true,
                    UserLession: {
                        where: {
                            userId: user.id,
                            courseId: quizDetails.courseId,
                            is_completed: true,
                        },
                    },
                    UserQuiz: {
                        where: {
                            quizId: quizDetails.id,
                            studentId: user.id,
                        },
                    },
                },
            });
            const userCompletedQuizList = await functions_1.PrismaClient.userQuiz.groupBy({
                by: ['quizId'],
                where: {
                    studentId: user.id,
                    courseId: quizDetails.courseId,
                    is_completed: coreConstant_1.coreConstant.STATUS_ACTIVE,
                },
            });
            const totalCompletePercentage = ((courseDetails.UserLession.length + userCompletedQuizList.length) *
                100) /
                (courseDetails.Lesson.length + courseDetails.Quiz.length);
            const data = {
                user_quiz_details: userQuizDetails,
                total_complete_percentage: totalCompletePercentage.toFixed(2),
            };
            return (0, functions_1.successResponse)('Quiz Result details', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
};
QuizService = __decorate([
    (0, common_1.Injectable)()
], QuizService);
exports.QuizService = QuizService;
//# sourceMappingURL=quiz.service.js.map