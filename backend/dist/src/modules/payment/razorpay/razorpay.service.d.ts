export declare class RazorpayPaymentService {
    private razorpay;
    constructor();
    init(): Promise<void>;
    createOrder(amount: number, currency: string): Promise<import("razorpay/dist/types/orders").Orders.RazorpayOrder>;
    capturePayment(orderId: string, amount: number, currency: string): Promise<import("razorpay/dist/types/payments").Payments.RazorpayPayment>;
    private retrieveOrder;
    verifyPayment(orderId: string): Promise<boolean>;
}
