"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("../prisma/prisma.module");
const auth_module_1 = require("../auth/auth.module");
const core_1 = require("@nestjs/core");
const jwt_auth_guard_1 = require("../../shared/guards/jwt-auth.guard");
const mail_config_1 = require("../../shared/configs/mail.config");
const users_module_1 = require("../users/users.module");
const apisecret_middleware_1 = require("../../shared/middlewares/apisecret.middleware");
const files_module_1 = require("../file/files.module");
const coreConstant_1 = require("../../shared/helpers/coreConstant");
const transform_interseptor_1 = require("../../shared/utils/transform.interseptor");
const googleauth_config_1 = __importDefault(require("../../shared/configs/googleauth.config"));
const check_demo_middleware_1 = require("../../shared/middlewares/check-demo.middleware");
const public_module_1 = require("../public/public.module");
const logger_module_1 = require("../logger/logger.module");
const kyc_module_1 = require("../kyc/kyc.module");
const category_module_1 = require("../category/category.module");
const faq_module_1 = require("../faq/faq.module");
const coupon_module_1 = require("../coupon/coupon.module");
const subscriber_module_1 = require("../subscriber/subscriber.module");
const settings_module_1 = require("../settings/settings.module");
const payment_module_1 = require("../payment/payment.module");
const course_module_1 = require("../course/course.module");
const follower_module_1 = require("../follower-management/follower.module");
const enrollment_module_1 = require("../enrollment/enrollment.module");
const notification_module_1 = require("../notification-management/notification.module");
const review_module_1 = require("../review/review.module");
const quiz_module_1 = require("../quiz-management/quiz.module");
const certificate_module_1 = require("../certificate-management/certificate.module");
const earning_module_1 = require("../earning-management/earning.module");
const blog_module_1 = require("../blog/blog.module");
const class_module_1 = require("../liveclass/class.module");
const wishlist_module_1 = require("../wishlist-management/wishlist.module");
const social_media_module_1 = require("../social-media-management/social-media.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(apisecret_middleware_1.ApiSecretCheckMiddleware)
            .exclude({
            path: `/${coreConstant_1.coreConstant.FILE_DESTINATION}/*`,
            method: common_1.RequestMethod.ALL,
        })
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
        consumer.apply(check_demo_middleware_1.CheckDemoMode).forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [mail_config_1.MailConfig, googleauth_config_1.default],
            }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            files_module_1.FilesModule,
            public_module_1.PublicModule,
            logger_module_1.LoggerModule,
            kyc_module_1.KycModule,
            category_module_1.CategoryModule,
            faq_module_1.FaqModule,
            coupon_module_1.CouponModule,
            subscriber_module_1.SubscriberModule,
            settings_module_1.SettingsModule,
            payment_module_1.PaymentModule,
            course_module_1.CourseModule,
            follower_module_1.FollowerModule,
            enrollment_module_1.EnrollmentModule,
            notification_module_1.NotificationModule,
            review_module_1.ReviewModule,
            quiz_module_1.QuizModule,
            certificate_module_1.CertificateModule,
            earning_module_1.EarningModule,
            blog_module_1.BlogModule,
            class_module_1.ClassModule,
            wishlist_module_1.WishListModule,
            social_media_module_1.SocialMediaModule
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: transform_interseptor_1.BigIntTransformInterceptor,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map