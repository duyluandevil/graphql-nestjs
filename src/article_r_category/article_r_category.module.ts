import { Module } from '@nestjs/common';
import { ArticleRCategoryService } from './article_r_category.service';
import { ArticleRCategoryResolver } from './article_r_category.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Article_R_Category, Article_R_CategorySchema } from './article_r_category_schema';

@Module({
  imports: [ MongooseModule.forFeature([{ name: Article_R_Category.name, schema: Article_R_CategorySchema }]) ],
  providers: [ArticleRCategoryService, ArticleRCategoryResolver]
})
export class ArticleRCategoryModule {}
