import { AxiosResponse } from 'axios';
export declare class PayStackService {
    private readonly payStackApiUrl;
    getBalance(): Promise<AxiosResponse<any>>;
    verifyPayment(reference: string): Promise<import("../../../shared/models/response.model").ResponseModel>;
    initiatePayment(amount: number, email: string, reference: string, type: string): Promise<any>;
}
