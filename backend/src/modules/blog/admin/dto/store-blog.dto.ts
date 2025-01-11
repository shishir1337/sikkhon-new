import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  FaqTypeArray,
  StatusOnOffArray,
} from 'src/shared/constants/array.constants';

export class StoreBlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsIn(StatusOnOffArray)
  @IsNumber()
  @IsNotEmpty()
  status: number;

  @IsNumber()
  @IsNotEmpty()
  blog_category_id: number;

  @IsString()
  @IsNotEmpty()
  tag: string;

  @IsNumber()
  @IsOptional()
  thumbnail_link: string;

  @IsNumber()
  @IsOptional()
  cover_image_link: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  meta_title: string;

  @IsString()
  @IsNotEmpty()
  meta_keyword: string;

  @IsString()
  @IsNotEmpty()
  meta_description: string;

  @IsNumber()
  @IsOptional()
  meta_img: number;
}
