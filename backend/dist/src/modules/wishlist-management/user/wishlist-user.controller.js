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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWishListController = void 0;
const common_1 = require("@nestjs/common");
const wishlist_service_1 = require("../wishlist.service");
const user_decorators_1 = require("../../../shared/decorators/user.decorators");
const client_1 = require("@prisma/client");
const add_to_wishlist_dto_1 = require("./add-to-wishlist.dto");
let UserWishListController = class UserWishListController {
    constructor(wishListService) {
        this.wishListService = wishListService;
    }
    addToWishList(user, payload) {
        return this.wishListService.addToWishList(user, payload);
    }
    getMyWishList(user, payload) {
        return this.wishListService.getMyWishListByPaginate(user, payload);
    }
    removeCourseWishList(user, wishlist_id) {
        return this.wishListService.removeCourseWishList(user, wishlist_id);
    }
};
__decorate([
    (0, common_1.Post)('add-to-wishlist'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _a : Object, add_to_wishlist_dto_1.AddToWishListDto]),
    __metadata("design:returntype", void 0)
], UserWishListController.prototype, "addToWishList", null);
__decorate([
    (0, common_1.Get)('my-wishlist'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], UserWishListController.prototype, "getMyWishList", null);
__decorate([
    (0, common_1.Delete)('remove-wishlist-course-:wishlist_id'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Param)('wishlist_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _c : Object, Number]),
    __metadata("design:returntype", void 0)
], UserWishListController.prototype, "removeCourseWishList", null);
UserWishListController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [wishlist_service_1.WishListService])
], UserWishListController);
exports.UserWishListController = UserWishListController;
//# sourceMappingURL=wishlist-user.controller.js.map