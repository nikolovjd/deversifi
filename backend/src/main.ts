import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import 'source-map-support/register';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const documentBuilder = new DocumentBuilder()
    .setTitle('TradeApp')
    .setDescription('TradeApp API')
    .setVersion('1.0.0')
    .addServer('/api')
    .addBearerAuth();

  SwaggerModule.setup(
    'documentation',
    app,
    SwaggerModule.createDocument(app, documentBuilder.build()),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.setGlobalPrefix('api');
  app.enableCors();

  await app.listen(3005);
}

bootstrap();
