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
  async articles(
    @Args('page') page: string,
    @Args('limit') limit: string,
    @Args('search') search: string,
    @Args('categoryid', {nullable: true}) categoryid: string,
    @Args('userid', {nullable: true}) userid: string,
  ) {
    return this.articleService.find({
      page: page,
      limit: limit,
      search: search,
      categoryid: categoryid,
      userid: userid,
    });
  }

  @ResolveField(() => [User])
  async user(@Parent() article: Article) {
    return this.articleService.findOneUser(article.userid.toString());
  }
}
