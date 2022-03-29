import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleResolver } from './article.resolver';
import { UserService } from 'src/user/user.service';
import { ArticleRCategoryService } from 'src/article_r_category/article_r_category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './article.schema';

@Module({
  imports: [ MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]) ],
  providers: [ArticleService, ArticleResolver, UserService, ArticleRCategoryService]
})
export class ArticleModule {}
