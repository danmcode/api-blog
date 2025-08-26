import { IsString, IsNotEmpty, IsOptional, IsBoolean, MinLength, IsNumber, IsArray } from 'class-validator';

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    title: string;

    @IsString()
    @IsOptional()
    content?: string;

    @IsString()
    @IsOptional()
    coverImage?: string;

    @IsString()
    @IsOptional()
    summary?: string;

    @IsBoolean()
    @IsOptional()
    isDraft?: boolean;

    @IsArray()
    @IsNumber({}, { each: true })
    @IsOptional()
    categoryIds: number[];
}
