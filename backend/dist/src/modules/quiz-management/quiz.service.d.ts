import { User } from '../users/entities/user.entity';
import { StoreQuizByInstructorDto } from './instructor/dto/store-quiz-instructor.dto';
import { StoreQuizQuestionDto } from './instructor/dto/store-quiz-question.dto';
import { StoreQuizQuestionAnswerDto } from './instructor/dto/store-quiz-question-answer.dto';
import { SaveQuizQuestionAnsDto } from './user/dto/save-quiz-question-ans.dto';
export declare class QuizService {
    createQuizByInstructor(user: User, payload: StoreQuizByInstructorDto): Promise<import("../../shared/models/response.model").ResponseModel>;
    getQuizListForInstructor(user: User, course_id: number, payload: any): Promise<import("../../shared/models/response.model").ResponseModel>;
    getQuizDetails(quize_id: number, user: User): Promise<import("../../shared/models/response.model").ResponseModel>;
    updateQuizByInstructor(user: User, id: number, payload: StoreQuizByInstructorDto): Promise<import("../../shared/models/response.model").ResponseModel>;
    deleteQuizDetailsByInstructor(user: User, quiz_id: number): Promise<import("../../shared/models/response.model").ResponseModel>;
    createQuizQuestionByInstructor(user: User, payload: StoreQuizQuestionDto): Promise<import("../../shared/models/response.model").ResponseModel>;
    getQuizQuestionList(user: User, quiz_id: number, payload: any): Promise<import("../../shared/models/response.model").ResponseModel>;
    getQuizQuestionDetails(user: User, quiz_question_id: number): Promise<import("../../shared/models/response.model").ResponseModel>;
    updateQuizQuestionByInstructor(user: User, quiz_question_id: number, payload: StoreQuizQuestionDto): Promise<import("../../shared/models/response.model").ResponseModel>;
    deleteQuizQuestion(user: User, quiz_question_id: number): Promise<import("../../shared/models/response.model").ResponseModel>;
    createQuestionAnswer(user: User, payload: StoreQuizQuestionAnswerDto): Promise<import("../../shared/models/response.model").ResponseModel>;
    getQuizQuestionAnswerList(user: User, quiz_question_id: number): Promise<import("../../shared/models/response.model").ResponseModel>;
    getQuizQuestionAnswerDetails(user: User, quiz_question_answer_id: number): Promise<import("../../shared/models/response.model").ResponseModel>;
    updateQuestionAnswer(user: User, quiz_question_answer_id: number, payload: StoreQuizQuestionAnswerDto): Promise<import("../../shared/models/response.model").ResponseModel>;
    deleteQuizQuestionAnswer(user: User, quiz_question_answer_id: number): Promise<import("../../shared/models/response.model").ResponseModel>;
    getQuizQuestionAnswerDetailsForStudent(user: User, quiz_id: number): Promise<import("../../shared/models/response.model").ResponseModel>;
    private getQuizQuestionSequentially;
    private getQuizQuestionRandomly;
    getQuizQuestionListForUser(user: User, quiz_id: number, payload: any): Promise<import("../../shared/models/response.model").ResponseModel>;
    saveQuizQuestionAnswerByUser(user: User, payload: SaveQuizQuestionAnsDto): Promise<import("../../shared/models/response.model").ResponseModel>;
    getQuizResultDetailsForUser(user: User, quiz_id: number): Promise<import("../../shared/models/response.model").ResponseModel>;
}
