/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { ConsoleLogger, Injectable } from '@nestjs/common';
import article from 'src/data/article';
import { Article, ArticleDocument } from './article.schema';
import articleRCategory from 'src/data/article.r.category';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';

@Injectable()
export class ArticleService {
  article: Partial<Article>[];
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async find(query) {
    const { page, limit, search, userid, categoryid } = query;

    //validate data
    if (query.page && isNaN(query.page)) {
      throw new Error('Param page is not number');
    }
    if (query.limit && isNaN(query.limit)) {
      throw new Error('Param limit is not number');
    }
    // if (query.userid && isNaN(query.userid)) {
    //   throw new Error('Param userid is not number');
    // }
    // if (query.categoryid && isNaN(query.categoryid)) {
    //   throw new Error('Param categoryid is not number');
    // }

    //is limit exists?
    if (!query.limit) { //limit is null
      //is search exists?
      if (!query.search) { //search is null
        if (!query.page){ // page is null return all user with default limit
          if(query.userid && !query.categoryid){ //filter by userid
            return this.articleModel.find({ userid: Number.parseInt(query.userid)}).limit(10);
          }
          else if(!query.userid && query.categoryid){//filter by categoryid
            console.log("Filter by category")
          }
          else if(!query.userid && !query.categoryid){//return all
            return this.articleModel.find().limit(10);
          }
        }
        else{ //page is not null return all user with default limit
          if(query.userid && !query.categoryid){ //filter by userid
            return this.articleModel
            .find({ userid: Number.parseInt(query.userid)})
            .limit(10)
            .skip(5 * Number.parseInt(query.page));
          }
          else if(!query.userid && query.categoryid){//filter by categoryid
            console.log("Filter by category and with page")
          }
        }
      } else {
        //search is not null
        if (!query.page)
          return this.articleModel
            .find({ name: new RegExp(query.search) })
            .limit(10);
        else
          return this.articleModel
            .find({ name: new RegExp(query.search) })
            .limit(10)
            .skip(5 * Number.parseInt(query.page)); //câu hỏi
      }
    } else {
      //limit is not null

      if (!query.search) {
        //search is null
        if (!query.page)
          return this.articleModel.find().limit(Number.parseInt(query.limit));
        // page is null return all user with default limit
        else
          return this.articleModel
            .find()
            .limit(Number.parseInt(query.limit))
            .skip(5 * Number.parseInt(query.page)); // page is not null return all user with default limit
      } else {
        //search is not null
        if (!query.page)
          return this.articleModel
            .find({ name: new RegExp(query.search) })
            .limit(Number.parseInt(query.limit));
        else
          return this.articleModel
            .find({ name: new RegExp(query.search) })
            .limit(Number.parseInt(query.limit))
            .skip(5 * Number.parseInt(query.page));
      }
    }
  }

  async findOneUser(id: string){
    return [this.userModel.findOne({_id: id})];
  }
}
