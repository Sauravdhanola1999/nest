import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from "./entities/book.entity";
import { Repository } from "typeorm";
import { CreateBookDto } from "./dto/create-books.dto";



@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private bookRepo: Repository<Book>,
    ) {}

    async findOne(id: number): Promise<Book> {
        const book =  await this.bookRepo.findOne({ where: { id } });
        if (!book) {
              throw new NotFoundException(`Book with id ${id} not found`);
            }
        return book;
    }

    async create(createBooksDto: CreateBookDto): Promise<Book> {
        const book = this.bookRepo.create(createBooksDto);
        return this.bookRepo.save(book);
    }
}