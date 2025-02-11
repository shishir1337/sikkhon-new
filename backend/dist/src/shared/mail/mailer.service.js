"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerService = void 0;
const nodemailer = __importStar(require("nodemailer"));
const handlebars = __importStar(require("handlebars"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const common_1 = require("@nestjs/common");
const path = __importStar(require("path"));
const util_1 = require("util");
const fs_1 = require("fs");
const array_constants_1 = require("../constants/array.constants");
const functions_1 = require("../helpers/functions");
const readFileAsync = (0, util_1.promisify)(fs_1.readFile);
let MailerService = class MailerService {
    async loadTemplate(templatePath) {
        const fullPath = path.join(process.cwd(), 'src', 'shared', 'mail', 'templates', templatePath);
        return await readFileAsync(fullPath, 'utf8');
    }
    async setupTemplates() {
        try {
            this.smtpConfig = await (0, functions_1.getAdminSettingsData)(array_constants_1.SMTPSettingsSlugs);
            const handlebarsOptions = {
                viewEngine: {
                    extname: '.hbs',
                    layoutsDir: path.join(__dirname, 'templates'),
                    defaultLayout: 'template',
                },
                viewPath: path.join(__dirname, 'templates'),
            };
            this.transporter = nodemailer.createTransport({
                host: this.smtpConfig.smtp_host,
                port: this.smtpConfig.smtp_port,
                secure: this.smtpConfig.smtp_encryption === 'SSL' ? true : false,
                auth: {
                    user: this.smtpConfig.smtp_user_name,
                    pass: this.smtpConfig.smtp_password,
                },
                pool: true,
                connectionTimeout: 5000,
            });
            this.transporter.use('compile', (0, nodemailer_express_handlebars_1.default)(handlebarsOptions));
            return (0, functions_1.successResponse)('Configuration successfully setup!');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async sendMail(to, subject, template, context) {
        try {
            await this.setupTemplates();
            const headerTemplate = await this.loadTemplate('headerTemplate.hbs');
            const footerTemplate = await this.loadTemplate('footerTemplate.hbs');
            const htmlTemplate = await this.loadTemplate(template);
            const siteLogo = await (0, functions_1.getAdminSettingsData)('site_logo');
            const siteLogoFullUrl = siteLogo && siteLogo.site_logo
                ? (0, functions_1.addPhotoPrefix)(siteLogo.site_logo)
                : null;
            const data = {
                context: context,
                frontEndUrl: process.env.FRONTEND_URL,
                logoUrl: siteLogoFullUrl,
                currentDate: new Date().toLocaleDateString(),
            };
            const compiledHeader = handlebars.compile(headerTemplate);
            const compiledFooter = handlebars.compile(footerTemplate);
            const compiledTemplate = handlebars.compile(htmlTemplate);
            const renderedHeader = compiledHeader(data);
            const renderedFooter = compiledFooter(data);
            const renderedContent = compiledTemplate(data);
            const finalHtml = renderedHeader + renderedContent + renderedFooter;
            const options = {
                from: await this.smtpConfig.smtp_sender_email,
                to,
                subject,
                html: finalHtml,
            };
            await this.transporter.sendMail(options);
            return (0, functions_1.successResponse)('Mail is sent successfully!');
        }
        catch (error) {
            (0, functions_1.processException)(error);
            return (0, functions_1.errorResponse)('Configuration Problem', error.message);
        }
    }
};
MailerService = __decorate([
    (0, common_1.Injectable)()
], MailerService);
exports.MailerService = MailerService;
//# sourceMappingURL=mailer.service.js.map