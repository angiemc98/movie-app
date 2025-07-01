import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
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
  ],
})
export class AppModule {}