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
exports.UserQuizController = void 0;
const common_1 = require("@nestjs/common");
const quiz_service_1 = require("../quiz.service");
const user_decorators_1 = require("../../../shared/decorators/user.decorators");
const user_entity_1 = require("../../users/entities/user.entity");
const save_quiz_question_ans_dto_1 = require("./dto/save-quiz-question-ans.dto");
let UserQuizController = class UserQuizController {
    constructor(quizService) {
        this.quizService = quizService;
    }
    getQuizQuestionAnswerDetailsForStudent(user, quiz_id) {
        return this.quizService.getQuizQuestionAnswerDetailsForStudent(user, quiz_id);
    }
    getQuizQuestionListForUser(user, quiz_id, payload) {
        return this.quizService.getQuizQuestionListForUser(user, quiz_id, payload);
    }
    saveQuizQuestionAnswerByUser(user, payload) {
        return this.quizService.saveQuizQuestionAnswerByUser(user, payload);
    }
    getQuizResultDetailsForUser(user, quiz_id) {
        return this.quizService.getQuizResultDetailsForUser(user, quiz_id);
    }
};
__decorate([
    (0, common_1.Get)('quiz-details-:quiz_id'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Param)('quiz_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number]),
    __metadata("design:returntype", void 0)
], UserQuizController.prototype, "getQuizQuestionAnswerDetailsForStudent", null);
__decorate([
    (0, common_1.Get)('start-quiz-:quiz_id'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Param)('quiz_id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number, Object]),
    __metadata("design:returntype", void 0)
], UserQuizController.prototype, "getQuizQuestionListForUser", null);
__decorate([
    (0, common_1.Post)('save-quiz-question-ans'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        save_quiz_question_ans_dto_1.SaveQuizQuestionAnsDto]),
    __metadata("design:returntype", void 0)
], UserQuizController.prototype, "saveQuizQuestionAnswerByUser", null);
__decorate([
    (0, common_1.Get)('quiz-result-details-:quiz_id'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Param)('quiz_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number]),
    __metadata("design:returntype", void 0)
], UserQuizController.prototype, "getQuizResultDetailsForUser", null);
UserQuizController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [quiz_service_1.QuizService])
], UserQuizController);
exports.UserQuizController = UserQuizController;
//# sourceMappingURL=user-quiz.controller.js.map