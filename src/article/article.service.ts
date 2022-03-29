/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import article from 'src/data/article';
import { Article } from './article.schema';
import { ArticleRCategoryService } from '../article_r_category/article_r_category.service';
import articleRCategory from 'src/data/article.r.category';

@Injectable()
export class ArticleService {
  article: Partial<Article>[];
  constructor(private articleRCategoryService: ArticleRCategoryService) {
    this.article = article;
  }

  async findAll() {
    //func to return all user in data
    return article;
  }

  async findOneById(id: string) {
    return [article.find((e) => e.id.toString() == id)];
    // console.log(user.find(e => e.id.toString() == id))
  }

  async filterUser(userId: string) {
    return article.filter((e) => e.userid.toString() === userId);
  }

  async filterCategory(categoryId: string) {
    // articleRCategory.filter(e => e.categoryId === categoryId.toString())

    //get value from detail 
    let arrayMtach = articleRCategory.filter(e => e.categoryId === categoryId.toString())

    let arrayArticleId = []; // array has id of article
    arrayMtach.forEach(e => arrayArticleId.push(e.articleId))

    let arrayResultEnd = []; // create array for return articles
    arrayArticleId.forEach(e=> 
      arrayResultEnd.push(article.find(ele => ele.id.toString() === e))
      )
    
    return arrayResultEnd;


    
  }


}
