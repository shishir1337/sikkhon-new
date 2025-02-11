export declare class MailerService {
    private transporter;
    private smtpConfig;
    private loadTemplate;
    private setupTemplates;
    sendMail(to: string, subject: string, template: string, context?: any): Promise<import("../models/response.model").ResponseModel>;
}
