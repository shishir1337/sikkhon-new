export declare class EditCourseDto {
    id: number;
    name: string;
    duration?: number;
    description: string;
    privateStatus?: boolean;
    courseLevel?: number;
    discount_type?: number;
    discount_value?: number;
    isFree?: boolean;
    price: number;
    discountStatus?: boolean;
    thumbnailLink: number;
    coverImageLink: number;
    demoVideo: string;
    video_upload_source: number;
    metaTitle: string;
    metaKeyword: string;
    metaDescription: string;
    categoryId: number;
    subCategoryId: number;
}
