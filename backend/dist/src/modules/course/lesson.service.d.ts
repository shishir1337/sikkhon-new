import { ResponseModel } from 'src/shared/models/response.model';
import { CreateLessonDto } from './user/dto/create-lesson.';
import { EditLessonDto } from './user/dto/edit-lesson';
import { User } from '@prisma/client';
import { CheckLessionDto } from './user/dto/check-lession.dto';
export declare class LessonService {
    createLesson(payload: CreateLessonDto): Promise<ResponseModel>;
    getLessonBySectionId(sectionId: number): Promise<ResponseModel>;
    editLesson(payload: EditLessonDto): Promise<ResponseModel>;
    deleteLesson(lessonId: number): Promise<ResponseModel>;
    checkLession(user: User, payload: CheckLessionDto): Promise<ResponseModel>;
}
