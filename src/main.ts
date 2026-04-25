import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

// bootstrap()
// → Create Nest app
// → Set /api prefix
// → Enable validation
// → Enable CORS
// → Start server


async function bootstrap() {
  const app = await NestFactory.create(AppModule); //NestFactory creates the Nest application.
  // AppModule is your root module (where everything is wired together). Start the app using AppModule.
  app.setGlobalPrefix('api'); //  Adds /api before all routes.
  app.useGlobalPipes( // A pipe validates and transforms incoming data.
    new ValidationPipe({
      whitelist: true, // Removes properties not in DTO
      forbidNonWhitelisted: true, // Instead of removing extra fields, it throws error.
      transform: true, // Automatically converts types.
    })
  )

  app.enableCors(); // Allows frontend and backend to communicate.
  await app.listen(process.env.PORT || 5000);
}

// bootstrap();

// NestFactory.create()   -> build restaurant
// setGlobalPrefix()      -> add main entrance sign
// ValidationPipe         -> security checks at door
// enableCors()           -> allow delivery partners in
// listen()               -> open for customers