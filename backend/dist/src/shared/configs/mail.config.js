"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailConfig = void 0;
const config_1 = require("@nestjs/config");
exports.MailConfig = (0, config_1.registerAs)('mail', () => ({
    defaultMailer: process.env.MAIL_MAILER || 'smtp',
    mailers: {
        smtp: {
            host: process.env.MAIL_HOST || 'smtp.mailtrap.io',
            port: Number(process.env.MAIL_PORT || 587),
            username: process.env.MAIL_USERNAME,
            password: process.env.MAIL_PASSWORD,
            encryption: process.env.MAIL_ENCRYPTION,
        },
    },
    from: {
        address: process.env.MAIL_FROM_ADDRESS || 'info@example.com',
        name: process.env.MAIL_FROM_NAME || 'CompanyName',
    },
}));
//# sourceMappingURL=mail.config.js.map