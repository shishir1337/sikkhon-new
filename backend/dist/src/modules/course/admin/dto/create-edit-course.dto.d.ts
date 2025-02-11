export declare class CreateCourseByAdminDto {
    id: number;
    name: string;
    duration?: number;
    short_description: string;
    description: string;
    private_status?: boolean;
    course_level?: number;
    discount_type?: number;
    discount_value?: number;
    is_free?: boolean;
    price: number;
    discount_status?: boolean;
    thumbnail_link: string;
    cover_image_link: string;
    demo_video: string;
    what_you_will_learn: string;
    requirments: string;
    video_upload_source: number;
    meta_title: string;
    meta_keyword: string;
    meta_description: string;
    category_id: number;
    sub_category_id: number;
    instructorId: number;
}
