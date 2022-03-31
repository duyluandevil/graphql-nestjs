/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './category.schema';
import { Article, ArticleSchema } from 'src/article/article.schema';

@Module({
  imports: [ MongooseModule.forFeature([
    { name: Category.name, schema: CategorySchema },
    { name: Article.name, schema: ArticleSchema }
  ]) ],
  providers: [CategoryService, CategoryResolver]
})
export class CategoryModule {}
