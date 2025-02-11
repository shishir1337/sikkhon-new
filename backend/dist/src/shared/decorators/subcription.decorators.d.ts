export declare const SUBSCRIPTION_KEY = "subscriptionType";
export declare function Subscription(type?: 'text' | 'image' | 'code' | 'translation' | 'transcription' | 'csv' | 'chat_bot'): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
