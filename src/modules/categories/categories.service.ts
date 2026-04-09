import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "./entities/category.entity";




@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private CategoryRepo: Repository<Category>,
    
) { }

  async findAll(): Promise<Category[]> {
    return this.CategoryRepo.find();
  }
  
  async findOne(id: number):Promise<Category> {
    const category = await this.CategoryRepo.findOne({where: {id}});
    if(!category){
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }
 
}
