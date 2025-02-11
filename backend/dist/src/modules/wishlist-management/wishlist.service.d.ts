import { User } from "../users/entities/user.entity";
import { AddToWishListDto } from "./user/add-to-wishlist.dto";
export declare class WishListService {
    addToWishList(user: User, payload: AddToWishListDto): Promise<import("../../shared/models/response.model").ResponseModel>;
    getMyWishListByPaginate(user: User, payload: any): Promise<import("../../shared/models/response.model").ResponseModel>;
    removeCourseWishList(user: User, wishlist_id: number): Promise<import("../../shared/models/response.model").ResponseModel>;
}
