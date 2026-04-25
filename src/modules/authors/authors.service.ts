import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Author } from "./entities/author.entity";
import { Repository } from "typeorm";


@Injectable() // Marks this class as a provider/service. This class can be injected into other classes.
export class AuthorsService {
    constructor( // You're injecting a database repository.
        @InjectRepository(Author)  // "Give me the TypeORM repository for the Author entity." Basically connect service ↔ Author table.
        private authorRepo: Repository<Author>, // This creates a repository object to talk to the database.
    ) { }
   
    async findOne(id: number): Promise<Author> { // Means this function uses asynchronous DB operations. Function will eventually return one Author.
        const author = await this.authorRepo.findOne({ where: {id}});
      if (!author) {
            throw new NotFoundException(`Author with id ${id} not found`);
          }
        return author;
    }

}