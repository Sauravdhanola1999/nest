import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { BookService } from "./books.service";
import { CreateBookDto } from "./dto/create-books.dto";



@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BookService) {}
   
    @Get(':id')
    findOne(@Param('id', ParseIntPipe)id: number) {
      return this.booksService.findOne(id);
    }
   
    @Post()
    create(@Body() createBooksDto: CreateBookDto) {
        return this.booksService.create(createBooksDto);
    }
}