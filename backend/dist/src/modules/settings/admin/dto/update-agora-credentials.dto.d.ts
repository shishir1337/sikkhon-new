import { ValidationOptions } from 'class-validator';
export declare class UpdateAgoraCredentialsDto {
    agora_status: number;
    agora_app_id: string;
    app_certificate: string;
}
export declare function IsRequiredAndNotEmptyIfAgoraStatus(value: number, validationOptions?: ValidationOptions, field_name?: string): (object: any, propertyName: string) => void;
