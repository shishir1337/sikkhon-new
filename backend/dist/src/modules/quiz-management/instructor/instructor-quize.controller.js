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
exports.InstructorQuizController = void 0;
const common_1 = require("@nestjs/common");
const quiz_service_1 = require("../quiz.service");
const user_decorators_1 = require("../../../shared/decorators/user.decorators");
const user_entity_1 = require("../../users/entities/user.entity");
const store_quiz_instructor_dto_1 = require("./dto/store-quiz-instructor.dto");
const is_instructor_decorator_1 = require("../../../shared/decorators/is-instructor.decorator");
const store_quiz_question_dto_1 = require("./dto/store-quiz-question.dto");
const store_quiz_question_answer_dto_1 = require("./dto/store-quiz-question-answer.dto");
let InstructorQuizController = class InstructorQuizController {
    constructor(quizService) {
        this.quizService = quizService;
    }
    createQuizByInstructor(user, payload) {
        return this.quizService.createQuizByInstructor(user, payload);
    }
    getQuizListForInstructor(user, course_id, payload) {
        return this.quizService.getQuizListForInstructor(user, course_id, payload);
    }
    getQuizDetails(id, user) {
        return this.quizService.getQuizDetails(id, user);
    }
    updateQuizByInstructor(user, id, payload) {
        return this.quizService.updateQuizByInstructor(user, id, payload);
    }
    deleteQuizDetailsByInstructor(user, id) {
        return this.quizService.deleteQuizDetailsByInstructor(user, id);
    }
    createQuizQuestionByInstructor(user, payload) {
        return this.quizService.createQuizQuestionByInstructor(user, payload);
    }
    getQuizQuestionList(user, quiz_id, payload) {
        return this.quizService.getQuizQuestionList(user, quiz_id, payload);
    }
    getQuizQuestionDetails(user, quiz_question_id) {
        return this.quizService.getQuizQuestionDetails(user, quiz_question_id);
    }
    updateQuizQuestionByInstructor(user, quiz_question_id, payload) {
        return this.quizService.updateQuizQuestionByInstructor(user, quiz_question_id, payload);
    }
    deleteQuizQuestion(user, quiz_question_id) {
        return this.quizService.deleteQuizQuestion(user, quiz_question_id);
    }
    createQuestionAnswer(user, payload) {
        return this.quizService.createQuestionAnswer(user, payload);
    }
    getQuizQuestionAnswerList(user, quiz_question_id) {
        return this.quizService.getQuizQuestionAnswerList(user, quiz_question_id);
    }
    getQuizQuestionAnswerDetails(user, quiz_question_answer_id) {
        return this.quizService.getQuizQuestionAnswerDetails(user, quiz_question_answer_id);
    }
    updateQuestionAnswer(user, quiz_question_answer_id, payload) {
        return this.quizService.updateQuestionAnswer(user, quiz_question_answer_id, payload);
    }
    deleteQuizQuestionAnswer(user, quiz_question_answer_id) {
        return this.quizService.deleteQuizQuestionAnswer(user, quiz_question_answer_id);
    }
};
__decorate([
    (0, common_1.Post)('create-quiz'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        store_quiz_instructor_dto_1.StoreQuizByInstructorDto]),
    __metadata("design:returntype", void 0)
], InstructorQuizController.prototype, "createQuizByInstructor", null);
__decorate([
    (0, common_1.Get)('quiz-list-:course_id'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Param)('course_id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number, Object]),
    __metadata("design:returntype", void 0)
], InstructorQuizController.prototype, "getQuizListForInstructor", null);
__decorate([
    (0, common_1.Get)('quiz-details-:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, user_decorators_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], InstructorQuizController.prototype, "getQuizDetails", null);
__decorate([
    (0, common_1.Put)('update-quiz-:id'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number, store_quiz_instructor_dto_1.StoreQuizByInstructorDto]),
    __metadata("design:returntype", void 0)
], InstructorQuizController.prototype, "updateQuizByInstructor", null);
__decorate([
    (0, common_1.Delete)('delete-quiz-details-:id'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number]),
    __metadata("design:returntype", void 0)
], InstructorQuizController.prototype, "deleteQuizDetailsByInstructor", null);
__decorate([
    (0, common_1.Post)('create-quiz-question'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        store_quiz_question_dto_1.StoreQuizQuestionDto]),
    __metadata("design:returntype", void 0)
], InstructorQuizController.prototype, "createQuizQuestionByInstructor", null);
__decorate([
    (0, common_1.Get)('quiz-question-list-:quiz_id'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Param)('quiz_id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number, Object]),
    __metadata("design:returntype", void 0)
], InstructorQuizController.prototype, "getQuizQuestionList", null);
__decorate([
    (0, common_1.Get)('quiz-question-details-:quiz_question_id'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Param)('quiz_question_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number]),
    __metadata("design:returntype", void 0)
], InstructorQuizController.prototype, "getQuizQuestionDetails", null);
__decorate([
    (0, common_1.Put)('update-question-:quiz_question_id'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Param)('quiz_question_id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number, store_quiz_question_dto_1.StoreQuizQuestionDto]),
    __metadata("design:returntype", void 0)
], InstructorQuizController.prototype, "updateQuizQuestionByInstructor", null);
__decorate([
    (0, common_1.Delete)('delete-quiz-question-:quiz_question_id'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Param)('quiz_question_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number]),
    __metadata("design:returntype", void 0)
], InstructorQuizController.prototype, "deleteQuizQuestion", null);
__decorate([
    (0, common_1.Post)('create-question-answer'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        store_quiz_question_answer_dto_1.StoreQuizQuestionAnswerDto]),
    __metadata("design:returntype", void 0)
], InstructorQuizController.prototype, "createQuestionAnswer", null);
__decorate([
    (0, common_1.Get)('quiz-question-answer-list-:quiz_question_id'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Param)('quiz_question_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number]),
    __metadata("design:returntype", void 0)
], InstructorQuizController.prototype, "getQuizQuestionAnswerList", null);
__decorate([
    (0, common_1.Get)('quiz-question-answer-detail-:quiz_question_answer_id'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Param)('quiz_question_answer_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number]),
    __metadata("design:returntype", void 0)
], InstructorQuizController.prototype, "getQuizQuestionAnswerDetails", null);
__decorate([
    (0, common_1.Put)('update-answer-:quiz_question_answer_id'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Param)('quiz_question_answer_id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number, store_quiz_question_answer_dto_1.StoreQuizQuestionAnswerDto]),
    __metadata("design:returntype", void 0)
], InstructorQuizController.prototype, "updateQuestionAnswer", null);
__decorate([
    (0, common_1.Delete)('delete-answer-:quiz_question_answer_id'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Param)('quiz_question_answer_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number]),
    __metadata("design:returntype", void 0)
], InstructorQuizController.prototype, "deleteQuizQuestionAnswer", null);
InstructorQuizController = __decorate([
    (0, is_instructor_decorator_1.IsInstructor)(),
    (0, common_1.Controller)('instructor'),
    __metadata("design:paramtypes", [quiz_service_1.QuizService])
], InstructorQuizController);
exports.InstructorQuizController = InstructorQuizController;
//# sourceMappingURL=instructor-quize.controller.js.map