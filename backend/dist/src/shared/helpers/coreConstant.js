"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawStatusConstant = exports.ReviewRatingConstant = exports.AnswerStatusConstant = exports.AnswerTypeConstant = exports.FileTypeConstant = exports.SeenUnseenStatusConstant = exports.FollowingStatusConstant = exports.PaymentStatusConstant = exports.CouponUsesTypeConstant = exports.DiscountConstant = exports.DefaultPaginationMetaData = exports.faqTypeConstant = exports.inputFieldTypeConstant = exports.packageTypeConstant = exports.UPLOAD_SOURCE = exports.DISCOUNT_TYPE = exports.LiveCLassStatus = exports.statusOnOffConstant = exports.modeStatusConstant = exports.coreConstant = void 0;
exports.coreConstant = {
    ROLES: {
        ADMIN: 1,
        SUPER_ADMIN: 2,
        STUDENT: 3,
        INSTRUCTOR: 4,
    },
    COURSE_LEVEL: {
        BEGINNER: 1,
        INTERMEDIATE: 2,
        ADVANCED: 3,
    },
    COMMON_PASSWORD: '123456',
    STATUS_INACTIVE: 0,
    STATUS_ACTIVE: 1,
    STATUS_PENDING: 2,
    STATUS_REJECTED: 3,
    IS_VERIFIED: 1,
    IS_NOT_VERIFIED: 0,
    IS_REJECTED: 3,
    VERIFICATION_TYPE_EMAIL: 1,
    FILE_DESTINATION: 'storage',
    WITHDRAW_FILE_DESTINATION: 'storage/withdraw-request',
    INACTIVE: 0,
    ACTIVE: 1,
    PENDING: 2,
    GENDER: {
        MALE: 1,
        FEMALE: 2,
        OTHERS: 3,
    },
    PAYMENT_METHODS: {
        STRIPE: 1,
        PAYPAL: 2,
        BRAINTREE: 3,
        PAYSTACK: 4,
    },
};
exports.modeStatusConstant = {
    LIVE: 1,
    SANDBOX: 2,
};
exports.statusOnOffConstant = {
    DEACTIVE: 0,
    ACTIVE: 1,
};
exports.LiveCLassStatus = {
    UPCOMING: 0,
    LIVE: 1,
    COMPLETED: 2,
    CANCELLED: 3,
};
exports.DISCOUNT_TYPE = {
    PERCENTAGE: 0,
    AMOUNT: 1,
};
exports.UPLOAD_SOURCE = {
    LOCAL: 1,
    YOUTUBE: 2,
    VIMEO: 3,
};
exports.packageTypeConstant = {
    REGULAR: 1,
    PREMIUM: 2,
};
exports.inputFieldTypeConstant = {
    INPUT_FIELD: 1,
    TEXTAREA_FIELD: 2,
};
exports.faqTypeConstant = {
    LANDING_PAGE: 0,
};
exports.DefaultPaginationMetaData = {
    total: 0,
    lastPage: 1,
    currentPage: 1,
    perPage: 0,
    prev: null,
    next: null,
};
exports.DiscountConstant = {
    DISCOUNT_FIXED: 0,
    DISCOUNT_PERCENTAGE: 1,
};
exports.CouponUsesTypeConstant = {
    LIMITED_USER: 0,
    UNLIMITED_USER: 1,
};
exports.PaymentStatusConstant = {
    PAYMENT_FAILED: 0,
    PAYMENT_SUCCESS: 1,
    PAYMENT_NOT_INITIATED: 2,
};
exports.FollowingStatusConstant = {
    UNFOLLOW: 0,
    FOLLOW: 1,
};
exports.SeenUnseenStatusConstant = {
    UNSEEN: 0,
    SEEN: 1,
};
exports.FileTypeConstant = {
    NONE: 0,
    IMAGE: 1,
    VIDEO: 2,
};
exports.AnswerTypeConstant = {
    MULTIPLE_CHOICE: 0,
    DESCRIPTION: 1,
};
exports.AnswerStatusConstant = {
    WRONG_ANSWER: 0,
    RIGHT_ANSWER: 1,
};
exports.ReviewRatingConstant = {
    ONE_STAR: 1,
    TWO_STAR: 2,
    THREE_STAR: 3,
    FOUR_STAR: 4,
    FIVE_STAR: 5,
};
exports.WithdrawStatusConstant = {
    PENDING: 0,
    ACCEPTED: 1,
    REJECTED: 2,
};
//# sourceMappingURL=coreConstant.js.map