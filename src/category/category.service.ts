/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import user from 'src/data/user';
import category from '../data/category';
import { Category, CreateCategoryInput, UpdateCategoryInput } from './category.schema';

@Injectable()
export class CategoryService {
  category: Partial<Category>[];
  constructor() {
    this.category = category;
  }

  async findAll(limit: number) {
    return category.slice(0, limit);
  }

  async findByName(limit: number, name: string) {
    return category.filter((e) => e.name === name).slice(0, limit);
  }

  //func validate data input for category
  checkData(category: Category) {
    let flag = true;
    if (category.name.length < 3 || category.name.length > 20) flag = false;
    else if (category.description.length < 10 || category.name.length > 200)
      flag = false;

    return flag;
  }

  async createCategory(nCategory: CreateCategoryInput) {
    if (this.checkData(nCategory)) {
      category.push(nCategory);
      return [nCategory];
    }
    throw new Error('wrong input data');
  }

  async deleteCategory(id: string) {
    const indexMatch = category.indexOf(
      category.find((e) => e.id.toString() === id),
    );
    if (indexMatch === -1) {
      return false;
    } else if (category.splice(indexMatch, 1)) return true;

    // console.log(category.splice(indexMatch, 1))
  }

  async updateCategory(uCategory: UpdateCategoryInput) {
      if(this.checkData(uCategory)){
        const categoryMatch = category.find(e=> e.id.toString() === uCategory.id.toString());
        categoryMatch.name = uCategory.name;
        categoryMatch.description = uCategory.description;
        return [categoryMatch]; 
      }
      else{
          throw new Error("wrong input data")
      }
    // console.log(category.splice(indexMatch, 1))
  }
}
