import {Controller, Get, Post, Delete, Put, Body, Param, Query, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MoviesService } from './movies.service';
import { SearchMovieDto, AddFavoriteMovieDto, RateMovieDto } from './dto/search-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('search')
  @UseGuards(JwtAuthGuard)
  async searchMovies(@Query(ValidationPipe) searchMovieDto: SearchMovieDto) {
    return await this.moviesService.searchMovie(searchMovieDto);
  }

  @Get('details/:imdbID')
  @UseGuards(JwtAuthGuard)
  async getMovieDetails(@Param('imdbID') imdbID: string) {
    return await this.moviesService.getMovieDetails(imdbID);
  }

  @Post('favorites')
  @UseGuards(JwtAuthGuard)
  async addToFavorites(
    @Request() req: { user: { userId: number } },
    @Body(ValidationPipe) addFavoriteMovieDto: AddFavoriteMovieDto,
  ) {
    return await this.moviesService.addFavoriteMovie(
      addFavoriteMovieDto.imdbID,
      req.user.userId,
    );
  }

  @Get('favorites')
  @UseGuards(JwtAuthGuard)
  async getFavoriteMovies(@Request() req: { user: { userId: number } },){
    return await this.moviesService.getFavoriteMovies(req.user.userId);
  }

  @Delete('favorites/:imdbID')
  @UseGuards(JwtAuthGuard)
  async removeFromFavorites(
    @Request() req: { user: { userId: number } },
    @Param('imdbID') imdbID: string,
  ) {
    return await this.moviesService.removeFavoriteMovie(imdbID, req.user.userId);
  }

  @Put('favorites/:imdbID/rate')
  @UseGuards(JwtAuthGuard)
  async rateMovie(
    @Request() req: { user: { userId: number } },
    @Param('imdbID') imdbID: string,
    @Body(ValidationPipe) rateMovieDto: RateMovieDto,
  ) {
    return await this.moviesService.RateMovie(imdbID, req.user.userId, rateMovieDto.rating);
  }
}