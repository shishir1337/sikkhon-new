import { CreateUserDto } from './dto/create-user.dto';
import { UserResponse } from './dto/user-response';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { ResponseModel } from 'src/shared/models/response.model';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserEntity } from '../entities/user.entity';
import { ChangePasswordDto } from '../../auth/dto/change-password.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UsersService);
    getProfile(req: any, user: UserEntity): Promise<ResponseModel>;
    getInstructirDashboardInfo(user: User): Promise<ResponseModel>;
    create(payload: CreateUserDto): Promise<UserResponse>;
    list(payload: any): Promise<ResponseModel>;
    updateProfile(user: User, payload: UpdateUserDto): Promise<ResponseModel>;
    checkUserNameIsUnique(user: User, payload: {
        user_name: string;
    }): Promise<ResponseModel>;
    becomeAnInstructor(user: User): Promise<ResponseModel>;
    assignInstructor(payload: {
        user_id: number;
    }): Promise<ResponseModel>;
    getPendingInstructorApplications(payload: any): Promise<ResponseModel>;
    getInstructorApplicationStatus(user: User): Promise<ResponseModel>;
    changeStatus(payload: {
        user_id: number;
    }): Promise<ResponseModel>;
    userListByCountryWise(): Promise<ResponseModel>;
    userProfileDetails(payload: {
        user_id: number;
    }): Promise<ResponseModel>;
    updateEmail(user: User, payload: {
        email: string;
    }): Promise<ResponseModel>;
    testTextGen(payload: {
        text: string;
    }): Promise<ResponseModel>;
    changePassword(user: User, payload: ChangePasswordDto): Promise<ResponseModel>;
}
