import {
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  IsOptional,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  isbn: string;

  @IsInt()
  @Min(0)
  publishedYear: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  totalCopies?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  availableCopies?: number;

  @IsInt()
  @IsOptional()
  categoryId?: number;
}