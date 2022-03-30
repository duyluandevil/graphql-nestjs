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
    async articles(@Args('limit') limit: string, @Args('search') search: string, @Args('categoryId') categoryId: string, @Args('userId') userId: string) {
      return this.articleService.find(
        {
          limit: limit,
          search: search,
          categoryId: categoryId,
          userId: userId
        }
      )
    }

  @ResolveField(() => [User])
  async user(@Parent() article: Article) {
    // return await this.userService.findOneById(article.userid.toString());
    // console.log(this.userService.findOneById(article.userid.toString()))
    // console.log(typeof article.userid)
    // // console.log(user.articleId)
  }
}
