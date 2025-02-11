import Stripe from 'stripe';
export declare class StripeService {
    private stripe;
    constructor();
    init(): Promise<void>;
    createStripePaymentIntent(amount: number, currency?: string): Promise<Stripe.PaymentIntent>;
    verifyPaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent>;
}
