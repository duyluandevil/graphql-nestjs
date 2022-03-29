/* eslint-disable prettier/prettier */
import { ConsoleLogger, Injectable } from '@nestjs/common';
import articleRCategory from 'src/data/article.r.category';
import { Article_R_Category, CreateARCInput } from './article_r_category_schema';
import arc from 'src/data/article.r.category';
import article from 'src/data/article';
import user from 'src/data/user';
import category from 'src/data/category';

@Injectable()
export class ArticleRCategoryService {
  arc: Partial<Article_R_Category>[];
  constructor() {
      this.arc = arc;
  }

  async findAll(limit: number) {
    return articleRCategory.splice(0, limit);
    // console.log(articleRCategory.splice(0, limit))
  }

  async findArticleById(categoryId: number) {
    // let arrayMatch = articleRCategory.find(e => e.categoryId === categoryId.toString())
    console.log('Hello');
  }

  async createArticleRCategory(nARC: CreateARCInput) {
    if(this.checkData(nARC.categoryId, nARC.articleId)){
        arc.push(nARC);
        return [nARC];
    }
    throw new Error("wrong input data")
  }

  //create func check data, do articleid and categoryId is exists?
  checkData(categoryId: number, articleId: number){
    let flag = true;
    if(!article.find(e=> e.id == articleId)) //Is articleId is exists?
        flag = false;
    else if(!category.find(e=> e.id == categoryId)) //Is category is exists?
        flag = false;
    
    return flag;

    // console.log(article.find(e=> e.id === articleId));
  } 
}
