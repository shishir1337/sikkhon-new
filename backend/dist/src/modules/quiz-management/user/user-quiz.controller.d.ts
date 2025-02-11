import { QuizService } from '../quiz.service';
import { User } from 'src/modules/users/entities/user.entity';
import { SaveQuizQuestionAnsDto } from './dto/save-quiz-question-ans.dto';
export declare class UserQuizController {
    private readonly quizService;
    constructor(quizService: QuizService);
    getQuizQuestionAnswerDetailsForStudent(user: User, quiz_id: number): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getQuizQuestionListForUser(user: User, quiz_id: number, payload: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
    saveQuizQuestionAnswerByUser(user: User, payload: SaveQuizQuestionAnsDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getQuizResultDetailsForUser(user: User, quiz_id: number): Promise<import("../../../shared/models/response.model").ResponseModel>;
}
