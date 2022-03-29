/* eslint-disable prettier/prettier */
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Article } from './article.schema';
import { ArticleService } from './article.service';
import { UserService } from '../user/user.service';
import { User } from 'src/user/user.schema';

@Resolver(() => Article)
export class ArticleResolver {
  constructor(
    private articleService: ArticleService,
    private userService: UserService,
  ) {}

    @Query(() => [Article])
    async articles(@Args('limit') limit: string, @Args('categoryId') categoryId: string, @Args('userId') userId: string) {
      if( categoryId.length === 0 && userId.length === 0 ){
        return this.articleService.findAll(Number.parseInt(limit))
      }
      else if( categoryId.length === 0 && userId.length !== 0 ){ //return filter by userId
        return this.articleService.filterUser(userId)
      }
      else if( categoryId.length !== 0 && userId.length === 0  ){ //return filter by category
        return this.articleService.filterCategory(categoryId);
      }
      else if( categoryId.length !== 0 && userId.length !== 0  ){ //return data filter 2 params
        return this.articleService.filterCategoryAndUser(categoryId, userId);
      }
    }

}
