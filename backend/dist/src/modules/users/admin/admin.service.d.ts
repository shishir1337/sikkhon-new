import { CreateNewUserDto } from './dto/create-new-user.dto';
import { CreateNewAdminDto } from './dto/create-new-admin.dto';
import { ResponseModel } from 'src/shared/models/response.model';
export declare class AdminService {
    createNewUser(payload: CreateNewUserDto): Promise<ResponseModel>;
    createNewAdmin(payload: CreateNewAdminDto): Promise<ResponseModel>;
    getStudentList(payload: any): Promise<ResponseModel>;
    getInstructorList(payload: any): Promise<ResponseModel>;
    getInstructorListNoPagination(): Promise<ResponseModel>;
    getAdminDashboardInfo(): Promise<ResponseModel>;
    getAdminList(payload: any): Promise<ResponseModel>;
    listOfUserDefineRoleWithQuery(roles: string, payload: any): Promise<ResponseModel>;
}
