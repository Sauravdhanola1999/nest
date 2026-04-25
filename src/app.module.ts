import { Module } from '@nestjs/common';
// Imports the Module decorator from NestJS.
import { ConfigModule } from '@nestjs/config';
// Used to manage environment variables (.env), like:
// Database URL
// Port number
// Secret keys
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
// TypeOrmModule connects your app to the database using TypeORM.
// typeOrmConfig contains database settings (host, username, password, DB name, entities, etc.)
import { UserModule } from './modules/users/users.module';
import { CategoryModule } from './modules/categories/categories.module';
import { BooksModule } from './modules/books/books.moduel';


// @Module() is used to define a module in NestJS.
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Loads environment variables. isGlobal: true means you can use config anywhere without importing ConfigModule again.
    TypeOrmModule.forRoot(typeOrmConfig), // Establishes the database connection.
    UserModule,
    CategoryModule,
    BooksModule
  ],
})
export class AppModule {} // AppModule combines all modules into one application.

// AppModule → Main library building
// ConfigModule → Admin settings room
// TypeOrmModule → Connection to library database
// UserModule → Member section
// CategoryModule → Book genres section
// BooksModule → Book inventory section
