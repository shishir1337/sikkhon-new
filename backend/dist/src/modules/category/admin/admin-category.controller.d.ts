import { CategoryService } from '../category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { updateSubcategoryDto } from './dto/update-subcategory.dto ';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { paginateInterface } from 'src/shared/constants/types';
export declare class AdminCategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getAllCategory(payload: paginateInterface): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getAllActiveCategory(payload: paginateInterface): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getCategoryDetails(id: number): Promise<import("../../../shared/models/response.model").ResponseModel>;
    createCategory(payload: CreateCategoryDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    updateCategory(payload: UpdateCategoryDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    deleteCategory(id: number): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getAllSubCategory(payload: paginateInterface): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getSubCategoryDetails(id: number): Promise<import("../../../shared/models/response.model").ResponseModel>;
    createSubCategory(payload: CreateSubcategoryDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    updateSubCategory(payload: updateSubcategoryDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    deleteSubCategory(id: number): Promise<import("../../../shared/models/response.model").ResponseModel>;
}
