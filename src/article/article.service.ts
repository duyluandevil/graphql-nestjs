/* eslint-disable prefer-const */
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

  async findAll(limit: number) {
    //func to return all user in data
    return article.slice(0, limit);
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
    let arrayMtach = articleRCategory.filter(
      (e) => e.categoryId.toString() == categoryId.toString(),
    );

    let arrayArticleId = []; // array has id of article
    arrayMtach.forEach((e) => arrayArticleId.push(e.articleId));

    let arrayResultEnd = []; // create array for return articles
    arrayArticleId.forEach((e) =>
      arrayResultEnd.push(article.find((ele) => ele.id.toString() == e)),
    );

    return arrayResultEnd;
  }

  //get data filter 2 prams is userid and categoryId
  async filterCategoryAndUser(categoryId: string, userId: string) {
    let arrayMtach = articleRCategory.filter(
      (e) => e.categoryId.toString() === categoryId.toString(),
    );

    let arrayArticleId = []; // array has id of article
    arrayMtach.forEach((e) => arrayArticleId.push(e.articleId));

    let arrayResultWithCategory = []; // create array for return articles with category
    arrayArticleId.forEach((e) =>
      arrayResultWithCategory.push(
        article.find((ele) => ele.id.toString() == e),
      ),
    );

    // console.log(arrayResultWithCategory);

    let arrayResultEnd = []; // create array for return articles with category and userid
    arrayResultWithCategory.forEach((e) => {
        if(e.userid.toString() === userId)
          arrayResultEnd.push(e)
      }
    );

    return arrayResultEnd;

    // console.log(arrayMtach);
  }

  
  // async find(query){
  //   if(query.search)

  //   //query is object, check each property of query, each prop return result
  // }
}
