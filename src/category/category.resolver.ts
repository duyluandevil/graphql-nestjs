/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JsonResponse } from 'src/user/user.schema';
import {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from './category.schema';
import { CategoryService } from './category.service';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  //CRUD
  @Query(() => [Category])
  async categories(
    @Args('page') page: string,
    @Args('limit') limit: string,
    @Args('search') search: string,
  ) {
    return this.categoryService.find({
      page: page,
      limit: limit,
      search: search,
    });
  }

  @Mutation(() => JsonResponse)

  @Mutation(() => JsonResponse, { nullable: true }) //Create category
  async createCategory(@Args('input') input: CreateCategoryInput) {
    return this.categoryService.createCategory(input);
  }

  @Mutation(() => JsonResponse, { nullable: true }) //Delete User
  async deleteCategory(@Args('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }

  @Mutation(() => [Category]) //Update category
  async updateCategory(
    @Args('_id') id: string,
    @Args('input') category: CreateCategoryInput,
  ) {
    return this.categoryService.updateCategory(id, category);
  }
}
