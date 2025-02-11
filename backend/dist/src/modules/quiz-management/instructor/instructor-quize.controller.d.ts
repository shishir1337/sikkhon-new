import { QuizService } from '../quiz.service';
import { User } from 'src/modules/users/entities/user.entity';
import { StoreQuizByInstructorDto } from './dto/store-quiz-instructor.dto';
import { StoreQuizQuestionDto } from './dto/store-quiz-question.dto';
import { StoreQuizQuestionAnswerDto } from './dto/store-quiz-question-answer.dto';
export declare class InstructorQuizController {
    private readonly quizService;
    constructor(quizService: QuizService);
    createQuizByInstructor(user: User, payload: StoreQuizByInstructorDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getQuizListForInstructor(user: User, course_id: number, payload: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getQuizDetails(id: number, user: User): Promise<import("../../../shared/models/response.model").ResponseModel>;
    updateQuizByInstructor(user: User, id: number, payload: StoreQuizByInstructorDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    deleteQuizDetailsByInstructor(user: User, id: number): Promise<import("../../../shared/models/response.model").ResponseModel>;
    createQuizQuestionByInstructor(user: User, payload: StoreQuizQuestionDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getQuizQuestionList(user: User, quiz_id: number, payload: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getQuizQuestionDetails(user: User, quiz_question_id: number): Promise<import("../../../shared/models/response.model").ResponseModel>;
    updateQuizQuestionByInstructor(user: User, quiz_question_id: number, payload: StoreQuizQuestionDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    deleteQuizQuestion(user: User, quiz_question_id: number): Promise<import("../../../shared/models/response.model").ResponseModel>;
    createQuestionAnswer(user: User, payload: StoreQuizQuestionAnswerDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getQuizQuestionAnswerList(user: User, quiz_question_id: number): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getQuizQuestionAnswerDetails(user: User, quiz_question_answer_id: number): Promise<import("../../../shared/models/response.model").ResponseModel>;
    updateQuestionAnswer(user: User, quiz_question_answer_id: number, payload: StoreQuizQuestionAnswerDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    deleteQuizQuestionAnswer(user: User, quiz_question_answer_id: number): Promise<import("../../../shared/models/response.model").ResponseModel>;
}
