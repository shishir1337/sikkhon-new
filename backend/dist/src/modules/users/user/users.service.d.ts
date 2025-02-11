import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UserVerificationCodeService } from '../../verification_code/user-verify-code.service';
import { ResponseModel } from 'src/shared/models/response.model';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserEntity } from '../entities/user.entity';
import { ChangePasswordDto } from '../../auth/dto/change-password.dto';
import { MailerService } from 'src/shared/mail/mailer.service';
export declare class UsersService {
    private readonly prisma;
    private readonly userCodeService;
    private readonly mailService;
    constructor(prisma: PrismaService, userCodeService: UserVerificationCodeService, mailService: MailerService);
    getInstructirDashboardInfo(user: User): Promise<ResponseModel>;
    getProfile(user: UserEntity): Promise<ResponseModel>;
    checkEmailNickName(email: string, nickName: string): Promise<ResponseModel>;
    create(payload: CreateUserDto): Promise<any>;
    createNewUser(payload: any, sendMail?: boolean): Promise<ResponseModel>;
    findByEmail(email: string): Promise<User>;
    findById(id: number): Promise<User>;
    userList(payload: any): Promise<ResponseModel>;
    statusChangeUser(payload: {
        user_id: number;
        status_type: number;
    }): Promise<ResponseModel>;
    createUserCode(payload: any): Promise<ResponseModel>;
    sendForgotPasswordEmailProcess(email: string): Promise<ResponseModel>;
    updateProfile(user: User, payload: UpdateUserDto): Promise<ResponseModel>;
    checkUserNameIsUnique(user: User, payload: {
        user_name: string;
    }): Promise<ResponseModel>;
    becomeAnInstructor(user: User): Promise<ResponseModel>;
    assignInstructor(user_id: number): Promise<ResponseModel>;
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
    userRegistrationBySocialMedia(payload: any): Promise<ResponseModel>;
    testTextGen(payload: {
        text: string;
    }): Promise<ResponseModel>;
    changePassword(user: User, payload: ChangePasswordDto): Promise<ResponseModel>;
}
