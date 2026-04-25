import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { AuthorsService } from "./authors.service";





@Controller('authors')  // (decorator in NestJS.) This class is a controller, and all routes inside it start with /authors.
// This class handles API requests, All endpoints inside start with /authors
export class AuthorsController {

    constructor(private readonly authorsService: AuthorsService) { }// “Create/provide an instance of AuthorsService and inject it into this controller.”
    // so, we dont have to create an instance of AuthorSerivice, we can directly access like this.authorsService
    
    @Get(':id') // Creates a GET route with a dynamic parameter.
     findOne(@Param('id', ParseIntPipe) id: number) { // Gets id from URL.,, A pipe converts and validates
        return this.authorsService.findOne(id);
     }

  
 
}