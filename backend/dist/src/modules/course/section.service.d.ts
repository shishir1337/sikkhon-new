import { ResponseModel } from 'src/shared/models/response.model';
import { CreateSectionDto } from './user/dto/create-section.dto';
import { EditSectionDto } from './user/dto/edit-section.dto';
import { User } from '@prisma/client';
export declare class SectionService {
    createSection(payload: CreateSectionDto): Promise<ResponseModel>;
    getSectionsByCourseId(courseId: number): Promise<ResponseModel>;
    getSectionById(sectionId: number): Promise<ResponseModel>;
    updateSection(payload: EditSectionDto): Promise<ResponseModel>;
    deleteSection(sectionId: number, user: User): Promise<ResponseModel>;
    adminDeleteSection(sectionId: number): Promise<ResponseModel>;
}
