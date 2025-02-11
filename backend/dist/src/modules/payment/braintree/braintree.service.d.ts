import * as braintree from 'braintree';
import { ResponseModel } from 'src/shared/models/response.model';
export declare class BraintreePaymentService {
    private gateway;
    constructor();
    private initializeBraintree;
    getClientToken(): Promise<ResponseModel>;
    createTransaction(amount: number, paymentMethodNonce: string): Promise<braintree.Transaction>;
}
