import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.setGlobalPrefix('v1');

  const config = new DocumentBuilder()
    .setTitle('Tokoku')
    .setDescription('Tokoku API Documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT ?? 3600;
  await app.listen(port, () => {
    console.log(`Server started on port : ${port}`);
    console.log(`Docs started on http://localhost:${port}/docs`);
  });
}
bootstrap();
