import { User } from '@prisma/client';
import { StoreLiveClassDto, UpdateLiveClassDto } from './instructor/dto/store-live-class.dto';
import { ResponseModel } from 'src/shared/models/response.model';
export declare class LiveClassService {
    createLiveClass(user: User, payload: StoreLiveClassDto): Promise<ResponseModel>;
    updateLiveClass(user: User, payload: UpdateLiveClassDto): Promise<ResponseModel>;
    getLiveClassDetails(liveClassId: string): Promise<ResponseModel>;
    getInstructorLiveClasses(user: User, payload: any): Promise<ResponseModel>;
    deleteLiveClass(user: User, id: string): Promise<ResponseModel>;
    liveClassCourseList(user: User): Promise<ResponseModel>;
    InstructorStartLiveClass(user: User, class_id: number, class_name: string): Promise<ResponseModel>;
    StudentJoinLiveClass(user: User, class_id: number, class_name: string): Promise<ResponseModel>;
    StudentLeaveLiveClass(user: User, className: string): Promise<ResponseModel>;
}
