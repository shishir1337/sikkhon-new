import { CategoryService } from '../category.service';
export declare class UserCategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getAllCategory(): Promise<import("../../../shared/models/response.model").ResponseModel>;
}
