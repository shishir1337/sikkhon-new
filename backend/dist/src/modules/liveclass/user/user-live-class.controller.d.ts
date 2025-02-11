import { LiveClassService } from '../live-class.service';
import { User } from '@prisma/client';
import { CreateLiveClassDto } from '../instructor/dto/create-liveclass.dto';
export declare class LiveClassStudentController {
    private readonly liveClassService;
    constructor(liveClassService: LiveClassService);
    startLiveClass(user: User, payload: CreateLiveClassDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
}
