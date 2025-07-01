import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, Max } from "class-validator";


export class SearchMovieDto {
  
  @IsString()  
  @IsNotEmpty()  
  title: string;

  @IsOptional()
  @IsString()
   year: string;

   @IsOptional()
    @IsString()
    type: 'movie' | 'series' | 'episode';

    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(1)
    page: number = 1;
}

export class AddFavoriteMovieDto {
        @IsString()
        @IsNotEmpty()
        imdbID: string;
}

export class RateMovieDto {
    @IsNumber()
    @Min(1)
    @Max(10)
    rating: number;

    @IsOptional()
    @IsString()
    comment: string; 
}