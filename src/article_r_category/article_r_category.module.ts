import { Module } from '@nestjs/common';
import { ArticleRCategoryService } from './article_r_category.service';
import { ArticleRCategoryResolver } from './article_r_category.resolver';

@Module({
  providers: [ArticleRCategoryService, ArticleRCategoryResolver]
})
export class ArticleRCategoryModule {}
