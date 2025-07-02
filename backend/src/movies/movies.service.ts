import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Movie } from './movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchMovieDto } from './dto/search-movie.dto';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class MoviesService {
   constructor(
        @InjectRepository(Movie) 
        private moviesRepository: Repository<Movie>,
        private httpService: HttpService,
        private configService: ConfigService,
    ) {}



    async searchMovie(searchMovieDto: SearchMovieDto) {
        const { title, year, type, page } = searchMovieDto;
        const apiKey = this.configService.get<string>('OMDB_API_KEY');
        const url = this.configService.get<string>('OMDB_API_URL');
        console.log('OMDB API Key:', apiKey);
        console.log('OMDB API URL:', url);
        if (!apiKey || !url) {
            throw new BadRequestException('OMDB API key or URL is not configured');
        }
        
        interface OmdbApiResponse {
            Response: string;
            Error?: string;
            Search?: any[];
            totalResults?: string;
        }

        try {
            const response = await firstValueFrom(
                this.httpService.get<OmdbApiResponse>(url, {
                    params: {
                        apikey: apiKey,
                        s: title,
                        y: year,
                        type: type,
                        page: page,
                    },
                })
            );
            if (response.data.Response === 'False') {
                throw new NotFoundException(`Movie not found: ${response.data.Error}`);
            }
            return {
                movies: response.data.Search,
                totalResults: response.data.totalResults,
                currentPage: page,
            };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new BadRequestException(`Error searching for movies`);
        }
    }
   async getMovieDetails(imdbID: string): Promise<Partial<Movie>> {
  const apiKey = this.configService.get<string>('OMDB_API_KEY');
  const url = this.configService.get<string>('OMDB_API_URL');
  if (!apiKey || !url) {
    throw new BadRequestException('OMDB API key or URL is not configured');
  }

  try {
    interface OmdbApiResponse {
      Response: string;
      Error?: string;
      imdbID?: string;
      Title?: string;
      Year?: string;
      Type?: string;
      Genre?: string;
      Director?: string;
      Actors?: string;
      Plot?: string;
      Poster?: string;
      Runtime?: string;
    }

    const response = await firstValueFrom(
      this.httpService.get<OmdbApiResponse>(url, {
        params: {
          apikey: apiKey,
          i: imdbID,
        },
      })
    );

    if (response.data.Response === 'False') {
      throw new NotFoundException(`Movie not found: ${response.data.Error}`);
    }

    const data = response.data;

    return {
      imdbID: data.imdbID,
      title: data.Title,
      year: data.Year,
      type: data.Type || 'movie',
      genre: data.Genre,
      director: data.Director,
      actors: data.Actors,
      plot: data.Plot,
      poster: data.Poster,
      runtime: data.Runtime,
    };
  } catch {
    throw new BadRequestException('Error fetching movie details from OMDb');
  }
}

    async addFavoriteMovie(imdbID: string, userId: number): Promise<Movie> {
        const existingMovie = await this.moviesRepository.findOne({ where: { imdbID, userId } });
        if (existingMovie) {
            throw new BadRequestException('Movie already exists in favorites');
        }

        const movieDetails = await this.getMovieDetails(imdbID);
        const movie = this.moviesRepository.create({
            ...movieDetails,
            userId,
        });

        return this.moviesRepository.save(movie);
    }
    async removeFavoriteMovie(imdbID: string, userId: number): Promise<void> {
        const movie = await this.moviesRepository.findOne({ where: { imdbID, userId } });
        if (!movie) {
            throw new NotFoundException('Movie not found in favorites');
        }
        await this.moviesRepository.remove(movie);
    }
    async getFavoriteMovies(userId: number): Promise<Movie[]> {
        const movies = await this.moviesRepository.find({ where: { userId } });
        if (movies.length === 0) {
            throw new NotFoundException('No favorite movies found for this user');
        }
        return movies;
    }
    async RateMovie(imdbID: string, userId: number, rating: number): Promise<Movie> {
        const movie = await this.moviesRepository.findOne({ where: { imdbID, userId } });
        if (!movie) {
            throw new NotFoundException('Movie not found in favorites');
        }
        if (rating < 0 || rating > 10) {
            throw new BadRequestException('Rating must be between 0 and 10');
        }
        movie.rating = rating;
        return this.moviesRepository.save(movie);
    }
}

