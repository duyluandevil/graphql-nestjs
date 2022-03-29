/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import article from 'src/data/article';
import { Article } from './article.schema';

@Injectable()
export class ArticleService {
  article: Partial<Article>[];
  constructor() {
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

  async filterUser(userId: string){
    return article.filter(e=>e.userid.toString() === userId);
  }
}
