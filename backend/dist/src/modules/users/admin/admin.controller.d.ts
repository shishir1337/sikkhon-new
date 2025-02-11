import { UsersService } from '../user/users.service';
import { AdminService } from './admin.service';
import { CreateNewUserDto } from './dto/create-new-user.dto';
import { CreateNewAdminDto } from './dto/create-new-admin.dto';
export declare class AdminController {
    private readonly userService;
    private readonly adminService;
    constructor(userService: UsersService, adminService: AdminService);
    createNewUser(payload: CreateNewUserDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    createNewAdmin(payload: CreateNewAdminDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getStudentList(payload: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getAdminDashboardDetails(): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getInstructorList(payload: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getInstructorListNoPagination(): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getAdminList(payload: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
    statusChangeUser(payload: {
        user_id: number;
        status_type: number;
    }): Promise<import("../../../shared/models/response.model").ResponseModel>;
}
