"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListService = void 0;
const common_1 = require("@nestjs/common");
const functions_1 = require("../../shared/helpers/functions");
const coreConstant_1 = require("../../shared/helpers/coreConstant");
let WishListService = class WishListService {
    async addToWishList(user, payload) {
        try {
            const courseDetails = await functions_1.PrismaClient.course.findFirst({
                where: {
                    id: payload.course_id
                }
            });
            if (!courseDetails) {
                return (0, functions_1.errorResponse)('Invalid Course!');
            }
            const checkAlreadyExist = await functions_1.PrismaClient.wishList.findFirst({
                where: {
                    courseId: courseDetails.id,
                    studentId: user.id
                }
            });
            if (checkAlreadyExist) {
                const updatedWishlist = await functions_1.PrismaClient.wishList.update({
                    where: {
                        id: checkAlreadyExist.id
                    },
                    data: {
                        status: checkAlreadyExist.status === coreConstant_1.coreConstant.STATUS_ACTIVE ? coreConstant_1.coreConstant.STATUS_INACTIVE : coreConstant_1.coreConstant.STATUS_ACTIVE
                    }
                });
                if (updatedWishlist.status) {
                    return (0, functions_1.successResponse)('Course is add to wishlist successfully!', updatedWishlist);
                }
                else {
                    return (0, functions_1.errorResponse)('Course is removed from wishlist!', updatedWishlist);
                }
            }
            else {
                const wishListDetails = await functions_1.PrismaClient.wishList.create({
                    data: {
                        studentId: user.id,
                        courseId: payload.course_id,
                        status: coreConstant_1.coreConstant.STATUS_ACTIVE
                    }
                });
                return (0, functions_1.successResponse)('Course is add to wishlist successfully!', wishListDetails);
            }
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getMyWishListByPaginate(user, payload) {
        try {
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            const wishList = await functions_1.PrismaClient.wishList.findMany(Object.assign({ where: {
                    studentId: user.id
                }, include: {
                    Course: {
                        include: {
                            User: true
                        }
                    },
                }, orderBy: {
                    created_at: 'desc'
                } }, paginate));
            wishList.map(async (wishlistdetails) => {
                wishlistdetails.Course.thumbnail_link = wishlistdetails.Course.thumbnail_link.startsWith('http') ? wishlistdetails.Course.thumbnail_link : (0, functions_1.addPhotoPrefix)(wishlistdetails.Course.thumbnail_link);
                wishlistdetails.Course.User.photo = (0, functions_1.addPhotoPrefix)(wishlistdetails.Course.User.photo);
                delete wishlistdetails.Course.User.password;
            });
            const data = {
                list: wishList,
                meta: await (0, functions_1.paginationMetaData)('wishList', payload),
            };
            return (0, functions_1.successResponse)('Wishlist by paginate for user', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async removeCourseWishList(user, wishlist_id) {
        try {
            const wishlistDetails = await functions_1.PrismaClient.wishList.findFirst({
                where: {
                    id: wishlist_id,
                    studentId: user.id
                }
            });
            if (!wishlistDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            return (0, functions_1.successResponse)('Course is removed from wishList successfully!');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
};
WishListService = __decorate([
    (0, common_1.Injectable)()
], WishListService);
exports.WishListService = WishListService;
//# sourceMappingURL=wishlist.service.js.map