import { Prisma } from '@prisma/client';
export declare class User implements Prisma.UserUncheckedCreateInput {
    id?: number;
    email: string;
    password: string;
    first_name?: string | null;
    last_name?: string | null;
    user_name?: string | null;
    unique_code?: string | null;
    phone?: string | null;
    photo?: string | null;
    country?: string | null;
    birth_date?: Date | string | null;
    roles?: string;
    status?: number;
    is_subscribed?: number;
    email_verified?: number;
    phone_verified?: number;
    gender?: number;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
}
