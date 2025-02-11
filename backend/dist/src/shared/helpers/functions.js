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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationMetaDataRandomly = exports.paginatioOptionsRandomly = exports.getRandomPageNumberExcluding = exports.generatePageArray = exports.updateOrCreateAdminSettings = exports.removePasswordFromUserList = exports.CheckEmailNickName = exports.checkRoleIsValid = exports.userRolesPermissionObject = exports.storeException = exports.createUniqueSlug = exports.createSlug = exports.generatePromptForJson = exports.generatePromptForTranslate = exports.generatePromptForCode = exports.saveBase64ImageAsJpg = exports.instructorSettingsValueBySlug = exports.adminSettingsValueBySlug = exports.getTotalDiscountAmount = exports.calculateDiscountedPrice = exports.fetchMyUploadFilePathById = exports.getInstructorSettingsData = exports.getAdminSettingsData = exports.paginationMetaData = exports.saveAudioLocally = exports.fileToBlob = exports.paginatioOptions = exports.formatLimitOffset = exports.isValidArrayOfObjectsStringChecker = exports.isArrayofObjects = exports.emailAppName = exports.appName = exports.envAppName = exports.base_url = exports.exchange_app_url = exports.clearTrailingSlash = exports.addDayWithCurrentDate = exports.generateMailKey = exports.errorResponse = exports.successResponse = exports.processException = exports.wordCountMultilingual = exports.hashedPassword = exports.processCourseLinks = exports.addPhotoPrefix = exports.createUniqueCode = exports.setApp = exports.myLogger = exports.PrismaClient = exports.app = void 0;
exports.generateChannelName = exports.generateAccessTokenFunction = exports.formatDateTime = exports.convertMinutesToHoursAndMinutes = exports.checkTwoArraysAreEqual = void 0;
const prisma_service_1 = require("../../../src/modules/prisma/prisma.service");
const client_1 = require("@prisma/client");
const crypto = require('crypto');
const bcrypt = __importStar(require("bcrypt"));
const sharp_1 = __importDefault(require("sharp"));
const fs = __importStar(require("fs"));
const coreConstant_1 = require("./coreConstant");
const path_1 = __importDefault(require("path"));
const logger_service_1 = require("../../modules/logger/logger.service");
const agora_access_token_1 = require("agora-access-token");
async function setApp(nestapp) {
    exports.app = nestapp;
    exports.PrismaClient = exports.app.get(prisma_service_1.PrismaService);
    exports.myLogger = await exports.app.resolve(logger_service_1.MyLogger);
}
exports.setApp = setApp;
function createUniqueCode() {
    let date = new Date().getTime();
    const id = crypto.randomBytes(10).toString('hex');
    const data = id + date;
    return data;
}
exports.createUniqueCode = createUniqueCode;
function addPhotoPrefix(inputString) {
    let prefix = process.env.BACKEND_URL;
    if (inputString) {
        return `${prefix}${inputString}`;
    }
    else {
        return null;
    }
}
exports.addPhotoPrefix = addPhotoPrefix;
function processCourseLinks(course) {
    const processedCourse = Object.assign(Object.assign({}, course), { thumbnail_link: course.thumbnail_link.startsWith('http')
            ? course.thumbnail_link
            : addPhotoPrefix(course.thumbnail_link), cover_image_link: course.cover_image_link.startsWith('http')
            ? course.cover_image_link
            : addPhotoPrefix(course.cover_image_link), demo_video: course.video_upload_source === coreConstant_1.UPLOAD_SOURCE.LOCAL && course.demo_video
            ? addPhotoPrefix(course.demo_video)
            : course.demo_video });
    if (course === null || course === void 0 ? void 0 : course.User) {
        processedCourse.User = Object.assign(Object.assign({}, course.User), { photo: addPhotoPrefix(course.User.photo) });
    }
    else {
        delete processedCourse.User;
    }
    return processedCourse;
}
exports.processCourseLinks = processCourseLinks;
async function hashedPassword(password) {
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltOrRounds);
    return hashPassword;
}
exports.hashedPassword = hashedPassword;
function wordCountMultilingual(inputString) {
    const words = inputString
        .trim()
        .split(/[\p{White_Space}\p{Punctuation}]+/u)
        .filter(Boolean);
    return words.length;
}
exports.wordCountMultilingual = wordCountMultilingual;
function processException(e) {
    storeException(e.message, 'error', e.stack);
    checkPrismaError(e);
    if ((e.hasOwnProperty('response') &&
        !e.response.hasOwnProperty('success') &&
        !e.response.hasOwnProperty('data')) ||
        !e.hasOwnProperty('response')) {
    }
}
exports.processException = processException;
function checkPrismaError(e) {
    if (e instanceof client_1.Prisma.PrismaClientKnownRequestError ||
        e instanceof client_1.Prisma.PrismaClientUnknownRequestError) {
        return errorResponse('Something went wrong.');
    }
}
function successResponse(msg, data) {
    return {
        success: true,
        message: msg !== null && msg !== void 0 ? msg : 'Response Success!',
        data: data || null,
    };
}
exports.successResponse = successResponse;
function errorResponse(msg, data) {
    return {
        success: false,
        message: msg !== null && msg !== void 0 ? msg : 'Response Error!',
        data: data || null,
    };
}
exports.errorResponse = errorResponse;
function generateMailKey() {
    return generateNDigitNumber(6);
}
exports.generateMailKey = generateMailKey;
function generateNDigitNumber(n) {
    return Math.floor(Math.pow(10, n - 1) + Math.random() * 9 * Math.pow(10, n - 1));
}
function addDayWithCurrentDate(dayCount) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + dayCount);
    return currentDate;
}
exports.addDayWithCurrentDate = addDayWithCurrentDate;
function clearTrailingSlash(str) {
    return str.replace(/\/$/, '');
}
exports.clearTrailingSlash = clearTrailingSlash;
function exchange_app_url() {
    var _a;
    return clearTrailingSlash((_a = process.env.EXCHANGE_APP_URL) !== null && _a !== void 0 ? _a : '');
}
exports.exchange_app_url = exchange_app_url;
function base_url() {
    var _a;
    return clearTrailingSlash((_a = process.env.APP_URL) !== null && _a !== void 0 ? _a : '');
}
exports.base_url = base_url;
function envAppName() {
    return process.env.APP_NAME || '';
}
exports.envAppName = envAppName;
async function appName() {
    return process.env.APP_NAME || '';
}
exports.appName = appName;
async function emailAppName() {
    const app_name = await appName();
    return app_name ? '[' + app_name + ']' : '';
}
exports.emailAppName = emailAppName;
function isArrayofObjects(arr) {
    if (!Array.isArray(arr)) {
        return false;
    }
    for (const element of arr) {
        if (typeof element !== 'object' ||
            element === null ||
            Array.isArray(element)) {
            return false;
        }
    }
    return true;
}
exports.isArrayofObjects = isArrayofObjects;
function isValidArrayOfObjectsStringChecker(jsonString) {
    try {
        const parsedData = JSON.parse(jsonString);
        console.log(parsedData, 'parsedData');
        if (!Array.isArray(parsedData)) {
            return false;
        }
        for (const element of parsedData) {
            if (typeof element !== 'object' ||
                element === null ||
                Array.isArray(element)) {
                return false;
            }
        }
        return true;
    }
    catch (error) {
        return false;
    }
}
exports.isValidArrayOfObjectsStringChecker = isValidArrayOfObjectsStringChecker;
async function formatLimitOffset(payload) {
    let limit = payload.limit ? Math.abs(parseInt(payload.limit)) : 10;
    let offset = payload.offset ? Math.abs(parseInt(payload.offset)) : 1;
    limit = isNaN(limit) ? 10 : limit;
    limit = limit > 0 ? limit : 10;
    offset = isNaN(offset) ? 1 : offset;
    offset = offset > 0 ? offset : 1;
    return {
        limit,
        offset,
    };
}
exports.formatLimitOffset = formatLimitOffset;
async function paginatioOptions(payload) {
    const limitOffset = await formatLimitOffset(payload);
    const limit = limitOffset.limit;
    const offset = limitOffset.offset;
    let skip = 0;
    if (limit > 0 && offset > 0) {
        skip = (offset - 1) * limit;
    }
    const data = {
        skip,
        take: limit,
    };
    return data;
}
exports.paginatioOptions = paginatioOptions;
function fileToBlob(file, callback) {
    const reader = new FileReader();
    reader.onload = function () {
        const blob = new Blob([reader.result], { type: file.type });
        callback(blob);
    };
    reader.onerror = function (error) {
        console.error('Error reading file:', error);
        callback(null);
    };
    reader.readAsArrayBuffer(file);
}
exports.fileToBlob = fileToBlob;
async function saveAudioLocally(file, filePath) {
    return new Promise((resolve, reject) => {
        const buffer = Buffer.from(file.buffer, 'base64');
        fs.writeFile(filePath, buffer, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(filePath);
            }
        });
    });
}
exports.saveAudioLocally = saveAudioLocally;
async function paginationMetaData(model, payload, whereCondition = {}) {
    var total = 0;
    if (typeof model == 'string') {
        total = await exports.PrismaClient[model].count({
            where: whereCondition,
        });
    }
    else {
        total = model.length;
    }
    const limitOffset = await formatLimitOffset(payload);
    const lastPage = Math.ceil(total / limitOffset.limit);
    const data = {
        total: total,
        lastPage: lastPage,
        currentPage: limitOffset.offset,
        perPage: limitOffset.limit,
        prev: limitOffset.offset > 1 ? limitOffset.offset - 1 : null,
        next: limitOffset.offset < lastPage ? limitOffset.offset + 1 : null,
    };
    return data;
}
exports.paginationMetaData = paginationMetaData;
async function getAdminSettingsData(slugs) {
    try {
        var data = {};
        if (Array.isArray(slugs)) {
            await Promise.all(slugs.map(async (slug) => {
                const slufInfo = await exports.PrismaClient.adminSettings.findFirst({
                    where: {
                        slug: slug,
                    },
                });
                if (slufInfo) {
                    data[slug] = slufInfo.value;
                }
                else {
                    data[slug] = null;
                }
            }));
        }
        else if (typeof slugs === 'string') {
            const slufInfo = await exports.PrismaClient.adminSettings.findFirst({
                where: {
                    slug: slugs,
                },
            });
            data[slugs] = slufInfo.value;
        }
        else {
            const slugInfoList = await exports.PrismaClient.adminSettings.findMany();
            slugInfoList.map((item) => {
                data[item.slug] = item.value;
            });
        }
        return data;
    }
    catch (error) {
        processException(error);
    }
}
exports.getAdminSettingsData = getAdminSettingsData;
async function getInstructorSettingsData(user_id, slugs) {
    try {
        var data = {};
        if (Array.isArray(slugs)) {
            await Promise.all(slugs.map(async (slug) => {
                const slufInfo = await exports.PrismaClient.instructorSettings.findFirst({
                    where: {
                        userId: user_id,
                        slug: slug,
                    },
                });
                if (slufInfo) {
                    data[slug] = slufInfo.value;
                }
                else {
                    data[slug] = null;
                }
            }));
        }
        else if (typeof slugs === 'string') {
            const slufInfo = await exports.PrismaClient.instructorSettings.findFirst({
                where: {
                    userId: user_id,
                    slug: slugs,
                },
            });
            data[slugs] = slufInfo.value;
        }
        else {
            const slugInfoList = await exports.PrismaClient.instructorSettings.findMany();
            slugInfoList.map((item) => {
                data[item.slug] = item.value;
            });
        }
        return data;
    }
    catch (error) {
        processException(error);
    }
}
exports.getInstructorSettingsData = getInstructorSettingsData;
const fetchMyUploadFilePathById = async (uploadUrl, metaImage) => {
    const uploadDetails = await exports.PrismaClient.myUploads.findFirst({
        where: uploadUrl
            ? { file_path: uploadUrl }
            : {
                id: metaImage,
            },
    });
    return (uploadDetails === null || uploadDetails === void 0 ? void 0 : uploadDetails.file_path) || '';
};
exports.fetchMyUploadFilePathById = fetchMyUploadFilePathById;
function calculateDiscountedPrice(price, discountPercentage) {
    const validDiscountPercentage = Math.max(0, Math.min(discountPercentage, 100));
    const discountAmount = (validDiscountPercentage / 100) * price;
    const discountedPrice = price - discountAmount;
    return Math.round(discountedPrice * 100) / 100;
}
exports.calculateDiscountedPrice = calculateDiscountedPrice;
function getTotalDiscountAmount(totalPrice, disCountedAmount, discountType) {
    let totalDiscount = 0;
    if (discountType === coreConstant_1.DISCOUNT_TYPE.PERCENTAGE) {
        totalDiscount = (totalPrice * disCountedAmount) / 100;
    }
    else {
        totalDiscount = disCountedAmount;
    }
    return totalDiscount;
}
exports.getTotalDiscountAmount = getTotalDiscountAmount;
const adminSettingsValueBySlug = async (slug) => {
    const adminSettingsData = await exports.PrismaClient.adminSettings.findFirst({
        where: {
            slug: slug,
        },
    });
    return adminSettingsData === null || adminSettingsData === void 0 ? void 0 : adminSettingsData.value;
};
exports.adminSettingsValueBySlug = adminSettingsValueBySlug;
const instructorSettingsValueBySlug = async (user_id, slug) => {
    const instructorSettingsData = await exports.PrismaClient.instructorSettings.findFirst({
        where: {
            userId: user_id,
            slug: slug,
        },
    });
    return instructorSettingsData === null || instructorSettingsData === void 0 ? void 0 : instructorSettingsData.value;
};
exports.instructorSettingsValueBySlug = instructorSettingsValueBySlug;
const uploadDirectory = `./${coreConstant_1.coreConstant.FILE_DESTINATION}`;
const saveBase64ImageAsJpg = (base64Image) => {
    return new Promise((resolve, reject) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileName = `${uniqueSuffix}.jpg`;
        const imagePath = path_1.default.join(uploadDirectory, fileName);
        const data = base64Image.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(data, 'base64');
        (0, sharp_1.default)(buffer)
            .jpeg({ quality: 80 })
            .toFile(imagePath, (err, info) => {
            if (err) {
                reject(err);
            }
            else {
                const imageUrl = `/${coreConstant_1.coreConstant.FILE_DESTINATION}/${fileName}`;
                resolve({ fileName, imageUrl });
                return imageUrl;
            }
        });
    });
};
exports.saveBase64ImageAsJpg = saveBase64ImageAsJpg;
async function generatePromptForCode(description, codingLanguage, codingLevel) {
    const prompt = `Generate code for me for ${description} using ${codingLanguage} programing languages. The coding level must be ${codingLevel}`;
    return prompt;
}
exports.generatePromptForCode = generatePromptForCode;
async function generatePromptForTranslate(text, language) {
    const prompt = `Please translate this text into ${language} language. My text is ${text}`;
    return prompt;
}
exports.generatePromptForTranslate = generatePromptForTranslate;
async function generatePromptForJson(topic) {
    const prompt = `Please generate a json data only give me result of json. topic is ${topic} i need 5 data's, must provide an object in array and minimum 2 data in the array object's, Prepare data like this [
    {
      "key": "value",
      "key": "value",
      "key": "value"
    }
  ]`;
    return prompt;
}
exports.generatePromptForJson = generatePromptForJson;
async function createSlug(categoryName) {
    categoryName = categoryName.trim();
    const slug = categoryName.replace(/\s+/g, '-').toLowerCase();
    return slug;
}
exports.createSlug = createSlug;
async function createUniqueSlug(title) {
    const originalSlug = title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    const uniqueSlug = `${originalSlug}-${Math.floor(Math.random() * 10000)}`;
    return uniqueSlug;
}
exports.createUniqueSlug = createUniqueSlug;
async function storeException(message, type, error) {
    const m = new logger_service_1.MyLogger();
    switch (type) {
        case 'error':
            m.error(message, error);
            break;
        case 'info':
            m.info(message);
            break;
        case 'warning':
            m.warn(message);
            break;
        case 'debug':
            m.debug(message);
            break;
        default:
            m.log(message);
    }
}
exports.storeException = storeException;
async function userRolesPermissionObject(roles) {
    const userRoles = (roles === null || roles === void 0 ? void 0 : roles.split(',').map((role) => Number(role))) || [];
    const data = {
        is_admin: userRoles.includes(coreConstant_1.coreConstant.ROLES.ADMIN),
        is_super_admin: userRoles.includes(coreConstant_1.coreConstant.ROLES.SUPER_ADMIN),
        is_instructor: userRoles.includes(coreConstant_1.coreConstant.ROLES.INSTRUCTOR),
    };
    return data;
}
exports.userRolesPermissionObject = userRolesPermissionObject;
async function checkRoleIsValid(roles, checkRole) {
    const userRoles = (roles === null || roles === void 0 ? void 0 : roles.split(',').map((role) => Number(role))) || [];
    return userRoles.includes(checkRole);
}
exports.checkRoleIsValid = checkRoleIsValid;
async function CheckEmailNickName(email, nickName) {
    const checkUniqueEmail = await exports.PrismaClient.user.findUnique({
        where: { email: email },
    });
    if (checkUniqueEmail) {
        return errorResponse('Email already exists', []);
    }
    const checkUniqueNickName = await exports.PrismaClient.user.findUnique({
        where: { user_name: nickName },
    });
    if (checkUniqueNickName) {
        return errorResponse('Nickname already exists', []);
    }
    return successResponse('success', []);
}
exports.CheckEmailNickName = CheckEmailNickName;
async function removePasswordFromUserList(userList) {
    const userListWithoutPassword = userList.map((user) => {
        const { password } = user, userWithoutPassword = __rest(user, ["password"]);
        userWithoutPassword.photo = userWithoutPassword.photo
            ? addPhotoPrefix(user.photo)
            : null;
        return userWithoutPassword;
    });
    return userListWithoutPassword;
}
exports.removePasswordFromUserList = removePasswordFromUserList;
async function updateOrCreateAdminSettings(slugKey, values) {
    try {
        const payload = {
            value: String(values),
        };
        await exports.PrismaClient.adminSettings.upsert({
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
        processException(error);
    }
}
exports.updateOrCreateAdminSettings = updateOrCreateAdminSettings;
async function generatePageArray(totalLength, itemsPerPage = 1) {
    const pageCount = Math.ceil(totalLength / itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
}
exports.generatePageArray = generatePageArray;
async function getRandomPageNumberExcluding(array1, visited_offset = null, nextPage = false, currentPage) {
    const visitedOffsetArray = visited_offset
        ? visited_offset.split(',').map(Number)
        : [];
    if (nextPage) {
        visitedOffsetArray.push(currentPage);
    }
    const validNumbers = array1.filter((num) => !visitedOffsetArray.includes(num));
    if (validNumbers.length === 0 && !nextPage) {
        return visitedOffsetArray.pop();
    }
    console.log(' validNumbers.length', validNumbers.length);
    if (validNumbers.length === 0 && nextPage) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * validNumbers.length);
    return validNumbers[randomIndex];
}
exports.getRandomPageNumberExcluding = getRandomPageNumberExcluding;
async function paginatioOptionsRandomly(totalItems, payload) {
    const limitOffset = await formatLimitOffset(payload);
    const limit = limitOffset.limit;
    let offset = limitOffset.offset;
    const pageList = await generatePageArray(totalItems, limit);
    offset = payload.visited_offset
        ? offset
        : await getRandomPageNumberExcluding(pageList, payload.visited_offset);
    let skip = 0;
    if (limit > 0 && offset > 0) {
        skip = (offset - 1) * limit;
    }
    const data = {
        skip,
        take: limit,
    };
    return data;
}
exports.paginatioOptionsRandomly = paginatioOptionsRandomly;
async function paginationMetaDataRandomly(totalItems, currentPage, payload) {
    var _a;
    const limitOffset = await formatLimitOffset(payload);
    const limit = limitOffset.limit;
    const pageList = await generatePageArray(totalItems, limit);
    const totalPageList = await generatePageArray(totalItems, limit);
    const visitedOffsetArray = payload.visited_offset
        ? payload.visited_offset.split(',').map(Number)
        : [];
    const data = {
        total: totalItems,
        lastPage: pageList.pop(),
        currentPage: currentPage,
        perPage: limit,
        prev: (_a = visitedOffsetArray.pop()) !== null && _a !== void 0 ? _a : null,
        next: await getRandomPageNumberExcluding(totalPageList, payload.visited_offset, true, currentPage),
    };
    return data;
}
exports.paginationMetaDataRandomly = paginationMetaDataRandomly;
async function checkTwoArraysAreEqual(array1, array2) {
    if (array1.length !== array2.length) {
        return false;
    }
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}
exports.checkTwoArraysAreEqual = checkTwoArraysAreEqual;
async function convertMinutesToHoursAndMinutes(minutes) {
    var hours = Math.floor(minutes / 60);
    var remainingMinutes = minutes % 60;
    var result = hours + ' hours';
    if (remainingMinutes > 0) {
        result += ' and ' + remainingMinutes + ' minutes';
    }
    return result;
}
exports.convertMinutesToHoursAndMinutes = convertMinutesToHoursAndMinutes;
async function formatDateTime(date) {
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    var hour = String(date.getHours()).padStart(2, '0');
    var minute = String(date.getMinutes()).padStart(2, '0');
    var second = String(date.getSeconds()).padStart(2, '0');
    var formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    return formattedDate;
}
exports.formatDateTime = formatDateTime;
async function generateAccessTokenFunction(appID, appCertificate, channelName, uid, expirationTimeInSeconds, role) {
    try {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
        const token = agora_access_token_1.RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpiredTs);
        return token;
    }
    catch (error) {
        console.error('Error generating Agora access token:', error);
        throw error;
    }
}
exports.generateAccessTokenFunction = generateAccessTokenFunction;
function generateChannelName(title) {
    const sanitizedTitle = title.replace(/\s+/g, '_');
    const uniqueIdentifier = Date.now();
    const channelName = `${sanitizedTitle}_${uniqueIdentifier}`;
    const maxLength = 50;
    return channelName.substring(0, maxLength);
}
exports.generateChannelName = generateChannelName;
//# sourceMappingURL=functions.js.map