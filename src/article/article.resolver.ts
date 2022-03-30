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

  //Final api Query
  /*
    articles(
      search: '',
      limit: '',
      category_id:'',
      user_id: ''
      page: 1
    ) {

    }
    */

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
        return this.articleService.filterCategoryAndUser(categoryId, userId)
      }
    }

  // @Query(() => [Article])
  // async article(@Args('args') args: string) {
  //   if (args) {
  //     return this.articleService.findOneById(args);
  //   }
  //   return this.articleService.findAll();
  //   // return this.userService.findWithCount(count);
  // }

  // //List article with filter userid
  // @Query(() => [Article])
  // async listArticleByUser(@Args('userId') userId: string) {
  //   return this.articleService.filterUser(userId);
  // }

  // //List article with filter categoryId
  // @Query(() => [Article])
  // async listArticleByCategory(@Args('categoryId') categoryId: string) {
  //   return this.articleService.filterCategory(categoryId);
  // }

  @ResolveField(() => [User])
  async user(@Parent() article: Article) {
    // return await this.userService.findOneById(article.userid.toString());
    // console.log(this.userService.findOneById(article.userid.toString()))
    // console.log(typeof article.userid)
    // // console.log(user.articleId)
  }
}
