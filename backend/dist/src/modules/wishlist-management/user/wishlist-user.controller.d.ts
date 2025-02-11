import { WishListService } from "../wishlist.service";
import { User } from "@prisma/client";
import { AddToWishListDto } from "./add-to-wishlist.dto";
export declare class UserWishListController {
    private readonly wishListService;
    constructor(wishListService: WishListService);
    addToWishList(user: User, payload: AddToWishListDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getMyWishList(user: User, payload: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
    removeCourseWishList(user: User, wishlist_id: number): Promise<import("../../../shared/models/response.model").ResponseModel>;
}
