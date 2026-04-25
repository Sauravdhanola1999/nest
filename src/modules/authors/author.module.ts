import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Author } from "./entities/author.entity";
import { AuthorsController } from "./authors.controller";
import { AuthorsService } from "./authors.service";

@Module({  // decorator that defines that this class is a NestJs Module. used to organize applicaiton structure
    imports: [TypeOrmModule.forFeature([Author])],  // Registers repository for the Author entity. repositories for this module
    controllers: [AuthorsController],
    providers: [AuthorsService],
    exports: [AuthorsService], // Makes AuthorsService available to other modules.
})

export class AuthorModule {}