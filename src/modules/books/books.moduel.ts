import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BooksController } from "./books.controller";
import { BookService } from "./books.service";


@Module({
    imports: [TypeOrmModule.forFeature([])],
    controllers: [BooksController],
    providers: [BookService],
    exports: [BookService],
})

export class BooksModule {}