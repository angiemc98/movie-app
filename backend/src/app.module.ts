import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hacer que la configuración esté disponible globalmente
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'movies_db',
      synchronize: true, 
      autoLoadEntities: true, // Cargar automáticamente las entidades
    }),
    UsersModule,
    AuthModule,
    MoviesModule,
  ],
})
export class AppModule {}