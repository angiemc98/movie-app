import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Permitir todas las solicitudes CORS
    credentials: true, // Permitir credenciales
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Permitir solo propiedades validadas
    forbidNonWhitelisted: true, // Prohibir propiedades no validadas
    transform: true, // Transformar los datos de entrada a los tipos correctos
  }));

  await app.listen(3000);
  console.log('Server is running on http://localhost:3000');
}
bootstrap();
