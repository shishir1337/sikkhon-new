"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const functions_1 = require("../../shared/helpers/functions");
const array_constants_1 = require("../../shared/constants/array.constants");
const config_1 = require("@nestjs/config");
const config_interface_1 = require("../../shared/configs/config.interface");
const mailer_service_1 = require("../../shared/mail/mailer.service");
const review_service_1 = require("../review/review.service");
const coreConstant_1 = require("../../shared/helpers/coreConstant");
let SettingsService = class SettingsService {
    constructor(configService, mailSer, reviewService) {
        this.configService = configService;
        this.mailSer = mailSer;
        this.reviewService = reviewService;
    }
    async updateOrCreate(slugKey, values) {
        try {
            const payload = {
                value: String(values),
            };
            await functions_1.PrismaClient.adminSettings.upsert({
                where: { slug: slugKey },
                create: {
                    slug: slugKey,
                    value: payload.value,
                },
                update: {
                    value: payload.value,
                },
            });
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async updateOrCreateInstructorSettings(userId, slugKey, values) {
        try {
            const payload = {
                value: String(values),
            };
            await functions_1.PrismaClient.instructorSettings.upsert({
                where: { slug: slugKey },
                create: {
                    userId: userId,
                    slug: slugKey,
                    value: payload.value,
                },
                update: {
                    userId: userId,
                    value: payload.value,
                },
            });
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async updateSMTPSettings(payload) {
        try {
            const keyValuePairs = Object.keys(payload).map((key) => ({
                key,
                value: payload[key],
            }));
            await Promise.all(keyValuePairs.map(async (element) => {
                await this.updateOrCreate(element.key, element.value);
            }));
            const slugs = array_constants_1.SMTPSettingsSlugs;
            const data = await (0, functions_1.getAdminSettingsData)(slugs);
            return (0, functions_1.successResponse)('SMTP settings is updated!', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getSmtpSettingsData() {
        try {
            const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.SMTPSettingsSlugs);
            return (0, functions_1.successResponse)('SMTP settings data!', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async sendTestMail(payload) {
        try {
            const response = await this.mailSer.sendMail(payload.email, 'test', 'test-mail.hbs');
            return response;
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getCommonSettingsDataForUser() {
        try {
            const data = {};
            data['countryList'] = array_constants_1.CountryListObjectArray;
            return (0, functions_1.successResponse)('Common settings', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getCommonSettingsData() {
        try {
            const data = {};
            data['countryList'] = array_constants_1.CountryListObjectArray;
            return (0, functions_1.successResponse)('Common settings', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async updateTermsPrivacy(payload) {
        try {
            const keyValuePairs = Object.keys(payload).map((key) => ({
                key,
                value: payload[key],
            }));
            await Promise.all(keyValuePairs.map(async (element) => {
                await this.updateOrCreate(element.key, element.value);
            }));
            const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.TermsPrivacySlugs);
            return (0, functions_1.successResponse)('Privacy policy and Terms condition is updated successfully!', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getTermsPrivacyData() {
        try {
            const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.TermsPrivacySlugs);
            return (0, functions_1.successResponse)('Privacy policy and Terms condition data!', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async updateGeneralSettings(payload) {
        try {
            const site_logo_path = payload.site_logo
                ? await (0, functions_1.fetchMyUploadFilePathById)(undefined, payload.site_logo)
                : await (0, functions_1.adminSettingsValueBySlug)('site_logo');
            const site_fav_icon_path = payload.site_fav_icon
                ? await (0, functions_1.fetchMyUploadFilePathById)(undefined, payload.site_fav_icon)
                : await (0, functions_1.adminSettingsValueBySlug)('site_fav_icon');
            const site_footer_logo_path = payload.site_footer_logo
                ? await (0, functions_1.fetchMyUploadFilePathById)(undefined, payload.site_footer_logo)
                : await (0, functions_1.adminSettingsValueBySlug)('site_footer_logo');
            const keyValuePairs = Object.entries(payload).map(([key, value]) => {
                if (key === 'site_logo') {
                    value = site_logo_path;
                }
                else if (key === 'site_fav_icon') {
                    value = site_fav_icon_path;
                }
                else if (key === 'site_footer_logo') {
                    value = site_footer_logo_path;
                }
                return { key, value };
            });
            await Promise.all(keyValuePairs.map((element) => this.updateOrCreate(element.key, element.value)));
            const settings = await (0, functions_1.getAdminSettingsData)(array_constants_1.GeneralSettingsSlugs);
            return (0, functions_1.successResponse)('Setting updated successfully', settings);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getGeneralSettingsData() {
        try {
            const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.GeneralSettingsSlugs);
            if (data.site_logo)
                data.site_logo = (0, functions_1.addPhotoPrefix)(data.site_logo);
            if (data.site_fav_icon)
                data.site_fav_icon = (0, functions_1.addPhotoPrefix)(data.site_fav_icon);
            data.site_footer_logo = (0, functions_1.addPhotoPrefix)(data.site_footer_logo);
            return (0, functions_1.successResponse)('General settings  data', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async updateGoogleAuthSettings(payload) {
        try {
            const keyValuePairs = Object.keys(payload).map((key) => ({
                key,
                value: payload[key],
            }));
            await Promise.all(keyValuePairs.map(async (element) => {
                await this.updateOrCreate(element.key, element.value);
            }));
            const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.GoogleAuthCredentialsSlugs);
            return (0, functions_1.successResponse)('Google auth credentials is update successfully!', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getGoogleAuthSettingsData() {
        try {
            const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.GoogleAuthCredentialsSlugs);
            return (0, functions_1.successResponse)('Google auth credentials', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async updateGithubAuthSettings(payload) {
        try {
            const keyValuePairs = Object.keys(payload).map((key) => ({
                key,
                value: payload[key],
            }));
            await Promise.all(keyValuePairs.map(async (element) => {
                await this.updateOrCreate(element.key, element.value);
            }));
            const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.GithubAuthCredentialsSlugs);
            return (0, functions_1.successResponse)('Github auth credentials is update successfully!', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getGithubAuthSettingsData() {
        try {
            const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.GithubAuthCredentialsSlugs);
            return (0, functions_1.successResponse)('Github auth credentials', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async updateLandingMainBannerData(payload) {
        try {
            const landing_main_banner_image_url = payload.landing_main_banner_image_url
                ? await (0, functions_1.fetchMyUploadFilePathById)(undefined, payload.landing_main_banner_image_url)
                : await (0, functions_1.adminSettingsValueBySlug)('landing_main_banner_image_url');
            const keyValuePairs = Object.entries(payload).map(([key, value]) => {
                if (key === 'landing_main_banner_image_url') {
                    value = landing_main_banner_image_url;
                }
                return { key, value };
            });
            await Promise.all(keyValuePairs.map(async (element) => {
                await this.updateOrCreate(element.key, element.value);
            }));
            const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.LandingMainBannerDataSlugs);
            return (0, functions_1.successResponse)('Landing page main banner section data is updated successfully!', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getLandingMainBannerData() {
        try {
            const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.LandingMainBannerDataSlugs);
            data.landing_main_banner_image_url = (0, functions_1.addPhotoPrefix)(data.landing_main_banner_image_url);
            return (0, functions_1.successResponse)('Landing page main banner section data', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async updateLandingAboutSectionData(payload) {
        try {
            const landing_about_us_first_image_url = payload.landing_about_us_first_image_url
                ? await (0, functions_1.fetchMyUploadFilePathById)(undefined, payload.landing_about_us_first_image_url)
                : await (0, functions_1.adminSettingsValueBySlug)('landing_about_us_first_image_url');
            const landing_about_us_second_image_url = payload.landing_about_us_second_image_url
                ? await (0, functions_1.fetchMyUploadFilePathById)(undefined, payload.landing_about_us_second_image_url)
                : await (0, functions_1.adminSettingsValueBySlug)('landing_about_us_second_image_url');
            const landing_about_us_third_image_url = payload.landing_about_us_third_image_url
                ? await (0, functions_1.fetchMyUploadFilePathById)(undefined, payload.landing_about_us_third_image_url)
                : await (0, functions_1.adminSettingsValueBySlug)('landing_about_us_third_image_url');
            const keyValuePairs = Object.entries(payload).map(([key, value]) => {
                if (key === 'landing_about_us_first_image_url') {
                    value = landing_about_us_first_image_url;
                }
                if (key === 'landing_about_us_second_image_url') {
                    value = landing_about_us_second_image_url;
                }
                if (key === 'landing_about_us_third_image_url') {
                    value = landing_about_us_third_image_url;
                }
                return { key, value };
            });
            await Promise.all(keyValuePairs.map(async (element) => {
                await this.updateOrCreate(element.key, element.value);
            }));
            const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.LandingAboutUsSectionDataSlugs);
            return (0, functions_1.successResponse)('Landing page about us section data is updated successfully!', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getLandingAboutSectionData() {
        try {
            const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.LandingAboutUsSectionDataSlugs);
            data.landing_about_us_first_image_url = (0, functions_1.addPhotoPrefix)(data.landing_about_us_first_image_url);
            data.landing_about_us_second_image_url = (0, functions_1.addPhotoPrefix)(data.landing_about_us_second_image_url);
            data.landing_about_us_third_image_url = (0, functions_1.addPhotoPrefix)(data.landing_about_us_third_image_url);
            return (0, functions_1.successResponse)('Landing page about us section data', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async updateLandingChooseUsSectionData(payload) {
        try {
            const landing_choose_us_first_image_url = payload.landing_choose_us_first_image_url
                ? await (0, functions_1.fetchMyUploadFilePathById)(undefined, payload.landing_choose_us_first_image_url)
                : await (0, functions_1.adminSettingsValueBySlug)('landing_choose_us_first_image_url');
            const keyValuePairs = Object.entries(payload).map(([key, value]) => {
                if (key === 'landing_choose_us_first_image_url') {
                    value = landing_choose_us_first_image_url;
                }
                return { key, value };
            });
            await Promise.all(keyValuePairs.map(async (element) => {
                await this.updateOrCreate(element.key, element.value);
            }));
            const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.LandingChooseUsSectionDataSlugs);
            return (0, functions_1.successResponse)('Landing page about us section data is updated successfully!', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getLandingChooseUsSectionData() {
        try {
            const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.LandingChooseUsSectionDataSlugs);
            data.landing_choose_us_first_image_url = (0, functions_1.addPhotoPrefix)(data.landing_choose_us_first_image_url);
            return (0, functions_1.successResponse)('Landing page choose us section data', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async updateLandingHowItWorkSectionData(payload) {
        try {
            const landing_how_it_work_list_first_image_url = payload.landing_how_it_work_list_first_image_url
                ? await (0, functions_1.fetchMyUploadFilePathById)(undefined, payload.landing_how_it_work_list_first_image_url)
                : await (0, functions_1.adminSettingsValueBySlug)('landing_how_it_work_list_first_image_url');
            const landing_how_it_work_list_second_image_url = payload.landing_how_it_work_list_second_image_url
                ? await (0, functions_1.fetchMyUploadFilePathById)(undefined, payload.landing_how_it_work_list_second_image_url)
                : await (0, functions_1.adminSettingsValueBySlug)('landing_how_it_work_list_second_image_url');
            const landing_how_it_work_list_third_image_url = payload.landing_how_it_work_list_third_image_url
                ? await (0, functions_1.fetchMyUploadFilePathById)(undefined, payload.landing_how_it_work_list_third_image_url)
                : await (0, functions_1.adminSettingsValueBySlug)('landing_how_it_work_list_third_image_url');
            const keyValuePairs = Object.entries(payload).map(([key, value]) => {
                if (key === 'landing_how_it_work_list_first_image_url') {
                    value = landing_how_it_work_list_first_image_url;
                }
                if (key === 'landing_how_it_work_list_second_image_url') {
                    value = landing_how_it_work_list_second_image_url;
                }
                if (key === 'landing_how_it_work_list_third_image_url') {
                    value = landing_how_it_work_list_third_image_url;
                }
                return { key, value };
            });
            await Promise.all(keyValuePairs.map(async (element) => {
                await this.updateOrCreate(element.key, element.value);
            }));
            const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.LandingHowItWorkSectionDataSlugs);
            return (0, functions_1.successResponse)('Landing page how it work section data is updated successfully!', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getLandingHowItWorkSectionData() {
        try {
            const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.LandingHowItWorkSectionDataSlugs);
            data.landing_how_it_work_list_first_image_url = (0, functions_1.addPhotoPrefix)(data.landing_how_it_work_list_first_image_url);
            data.landing_how_it_work_list_second_image_url = (0, functions_1.addPhotoPrefix)(data.landing_how_it_work_list_second_image_url);
            data.landing_how_it_work_list_third_image_url = (0, functions_1.addPhotoPrefix)(data.landing_how_it_work_list_third_image_url);
            return (0, functions_1.successResponse)('Landing page choose us section data', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getLlandingPageData() {
        try {
            const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.LandingPageSlugs);
            data.landing_main_banner_image_url = (0, functions_1.addPhotoPrefix)(data.landing_main_banner_image_url);
            data.landing_about_us_first_image_url = (0, functions_1.addPhotoPrefix)(data.landing_about_us_first_image_url);
            data.landing_about_us_second_image_url = (0, functions_1.addPhotoPrefix)(data.landing_about_us_second_image_url);
            data.landing_about_us_third_image_url = (0, functions_1.addPhotoPrefix)(data.landing_about_us_third_image_url);
            data.landing_choose_us_first_image_url = (0, functions_1.addPhotoPrefix)(data.landing_choose_us_first_image_url);
            data.landing_how_it_work_list_first_image_url = (0, functions_1.addPhotoPrefix)(data.landing_how_it_work_list_first_image_url);
            data.landing_how_it_work_list_second_image_url = (0, functions_1.addPhotoPrefix)(data.landing_how_it_work_list_second_image_url);
            data.landing_how_it_work_list_third_image_url = (0, functions_1.addPhotoPrefix)(data.landing_how_it_work_list_third_image_url);
            const reviewResponse = await this.reviewService.getReviewListForLandingPage(8);
            const landingData = {
                landing_data: data,
                review_list: reviewResponse.data,
            };
            return (0, functions_1.successResponse)('Landing page data!', landingData);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async updateInstructorSettings(user, payload) {
        try {
            const instructor_signature = payload.instructor_signature
                ? await (0, functions_1.fetchMyUploadFilePathById)(payload.instructor_signature)
                : await (0, functions_1.instructorSettingsValueBySlug)(user.id, 'instructor_signature');
            const keyValuePairs = Object.entries(payload).map(([key, value]) => {
                if (key === 'instructor_signature') {
                    value = instructor_signature;
                }
                return { userId: user.id, key, value };
            });
            await Promise.all(keyValuePairs.map(async (element) => {
                await this.updateOrCreateInstructorSettings(element.userId, element.key, element.value);
            }));
            const data = await (0, functions_1.getInstructorSettingsData)(user.id, array_constants_1.InstructorSettingsDataSlugs);
            data.instructor_signature = (0, functions_1.addPhotoPrefix)(data.instructor_signature);
            return (0, functions_1.successResponse)('Settings is updated!', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async updateBusinessSettings(payload) {
        try {
            const keyValuePairs = Object.entries(payload).map(([key, value]) => {
                return { key, value };
            });
            await Promise.all(keyValuePairs.map(async (element) => {
                await this.updateOrCreate(element.key, element.value);
            }));
            const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.BusinessSettingsDataSlug);
            return (0, functions_1.successResponse)('Business Settings is updated!', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getBusinessSettingsData() {
        try {
            const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.BusinessSettingsDataSlug);
            return (0, functions_1.successResponse)('Business Settings is data!', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async updateAgoraCredentials(payload) {
        try {
            if (payload.agora_status === coreConstant_1.statusOnOffConstant.ACTIVE) {
                if (!payload.agora_app_id || !payload.app_certificate) {
                    return (0, functions_1.errorResponse)('Agora App ID and Agora App Certificate is required!');
                }
            }
            const keyValuePairs = Object.entries(payload).map(([key, value]) => {
                return { key, value };
            });
            await Promise.all(keyValuePairs.map(async (element) => {
                await this.updateOrCreate(element.key, element.value);
            }));
            const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.AgoraCredentialsSlug);
            return (0, functions_1.successResponse)('Agora Credentials Settings is updated!', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getAgoraSettingsData() {
        try {
            const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.AgoraCredentialsSlug);
            return (0, functions_1.successResponse)('Agora Settings data!', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
};
SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        mailer_service_1.MailerService,
        review_service_1.ReviewService])
], SettingsService);
exports.SettingsService = SettingsService;
//# sourceMappingURL=settings.service.js.map