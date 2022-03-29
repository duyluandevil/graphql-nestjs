import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Article } from './article.schema';
import { ArticleService } from './article.service';
import { UserService } from '../user/user.service';
import { User } from 'src/user/user.schema';

@Resolver(()=> Article)
export class ArticleResolver {
  constructor(
    private articleService: ArticleService,
    private userService: UserService,
  ) {}

  @Query(() => [Article])
  async article(@Args('args') args: string) {
    if (args) {
      return this.articleService.findOneById(args);
    }
    return this.articleService.findAll();
    // return this.userService.findWithCount(count);
  }

  //List article with filter userid
  @Query(()=> [Article])
  async listArticle(@Args('userId') userId: string){
    return this.articleService.filterUser(userId);
  }

  @ResolveField(() => [User])
  async user(@Parent() article: Article) {
    return await this.userService.findOneById(article.userid.toString());
    // console.log(this.userService.findOneById(article.userid.toString()))
    // console.log(typeof article.userid)
    // // console.log(user.articleId)
  }
}
