/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Category, CreateCategoryInput, UpdateCategoryInput } from './category.schema';
import { CategoryService } from './category.service';

@Resolver()
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  //CRUD
  @Query(() => [Category]) //return all with limit
  async categories(@Args('limit') limit: string) {
    return this.categoryService.findAll(Number.parseInt(limit));
  }

  @Query(() => [Category]) //return all with limit
  async category(@Args('limit') limit: string, @Args('name') name: string) {
    return this.categoryService.findByName(Number.parseInt(limit), name);
  }


  @Mutation(() => [Category]) //Create category
  async createCategory(@Args('input') category: CreateCategoryInput) {
    return this.categoryService.createCategory(category);
  }

  @Query(() => Boolean) //Delete User
  async deleteCategory(@Args('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }

  @Mutation(() => [Category]) //Update category
  async updateCategory(@Args('input') category: UpdateCategoryInput) {
    return this.categoryService.updateCategory(category);
  }
}
