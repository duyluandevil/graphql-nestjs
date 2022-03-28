import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleResolver } from './article.resolver';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [ArticleService, ArticleResolver, UserService]
})
export class ArticleModule {}
