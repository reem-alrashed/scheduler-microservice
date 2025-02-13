import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle("Scheduler Microservice API")
    .setDescription("API documentation for the scheduler service")
    .setVersion("1.0")
    .addTag("jobs")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document); // Access API docs at /api

  await app.listen(3000);
}
bootstrap();
