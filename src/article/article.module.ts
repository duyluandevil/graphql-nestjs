import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleResolver } from './article.resolver';

@Module({
  providers: [ArticleService, ArticleResolver]
})
export class ArticleModule {}
