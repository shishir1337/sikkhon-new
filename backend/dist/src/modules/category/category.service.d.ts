import { ResponseModel } from 'src/shared/models/response.model';
import { CreateCategoryDto } from './admin/dto/create-category.dto';
import { UpdateCategoryDto } from './admin/dto/update-category.dto';
import { CreateSubcategoryDto } from './admin/dto/create-subcategory.dto';
import { updateSubcategoryDto } from './admin/dto/update-subcategory.dto ';
import { paginateInterface } from 'src/shared/constants/types';
export declare class CategoryService {
    constructor();
    getAllCategories(payload: paginateInterface): Promise<ResponseModel>;
    getAllActiveCategoriesPublic(): Promise<ResponseModel>;
    getAllActiveCategories(payload: paginateInterface): Promise<ResponseModel>;
    getCategoryDetails(id: number): Promise<ResponseModel>;
    createCategory(payload: CreateCategoryDto): Promise<ResponseModel>;
    updateCategory(payload: UpdateCategoryDto): Promise<ResponseModel>;
    deleteCategory(categoryId: number): Promise<ResponseModel>;
    getAllSubcategories(payload: paginateInterface): Promise<ResponseModel>;
    getSubCategoryDetails(id: number): Promise<ResponseModel>;
    createSubcategory(payload: CreateSubcategoryDto): Promise<ResponseModel>;
    updateSubcategory(payload: updateSubcategoryDto): Promise<ResponseModel>;
    deleteSubcategory(id: number): Promise<ResponseModel>;
}
