import { StoreLiveClassDto, UpdateLiveClassDto } from './dto/store-live-class.dto';
import { LiveClassService } from '../live-class.service';
import { User } from '@prisma/client';
import { CreateLiveClassDto } from './dto/create-liveclass.dto';
export declare class LiveClassInstructorController {
    private readonly liveClassService;
    constructor(liveClassService: LiveClassService);
    createLiveClass(user: User, payload: StoreLiveClassDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    updateLiveClass(user: User, data: UpdateLiveClassDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getLiveClassById(class_id: string): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getCourseForLiveClasses(user: User): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getLiveClass(user: User, payload: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
    deleteLiveClass(user: User, payload: {
        id: string;
    }): Promise<import("../../../shared/models/response.model").ResponseModel>;
    startLiveClass(user: User, payload: CreateLiveClassDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    leaveLiveClass(user: User, payload: {
        className: string;
    }): Promise<import("../../../shared/models/response.model").ResponseModel>;
}
