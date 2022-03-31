/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { ConsoleLogger, Injectable } from '@nestjs/common';
import article from 'src/data/article';
import {
  Article,
  ArticleDocument,
  CreateArticleInput,
  JsonResponseArticle,
} from './article.schema';
import articleRCategory from 'src/data/article.r.category';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { User, UserDocument } from 'src/user/user.schema';
import { Category, CategoryDocument } from 'src/category/category.schema';
import mongoose from 'mongoose';

@Injectable()
export class ArticleService {
  article: Partial<Article>[];
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
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

    //think page
    let skip = (query.page - 1) * query.limit;
    let queryparam: any = {};
    if (query.search) {
      queryparam.title = query.search;
    }

    if (query.userid) queryparam.userid = query.userid; //cannot compare 2 objectid, contain value but the objects not same, compare with ref
    if (query.categoryid) queryparam.categoryid = query.categoryid;

    

    const array = await this.articleModel
      .find({ title: new RegExp( queryparam.title )})
      .limit(query.limit)
      .skip(skip); //delcare array stores article

    let resultArray = []; // delcare array stores end result

    if(queryparam.userid && !queryparam.categoryid){ //only userid exist
      array.forEach(e => {
        if(e.userid.toString() === queryparam.userid)
          resultArray.push(e)
      })
       resultArray;
    }

    if(!queryparam.userid && queryparam.categoryid){ //only categoryid exist
      array.forEach(e => {
        if(e.categoryid.includes(queryparam.categoryid) && e.userid.toString() !== "" )
          resultArray.push(e)
      })
      return resultArray
    }

    if(!queryparam.userid && !queryparam.categoryid){ //not transmission 2 param
      array.forEach(e => {
        if(e.userid.toString() !== queryparam.userid)
          resultArray.push(e)
      })
      return resultArray;
    }

    if(queryparam.userid && queryparam.categoryid){ //2 both params exist 
      array.forEach(e => {
        if(e.userid.toString() === queryparam.userid && e.categoryid.includes(queryparam.categoryid))
          resultArray.push(e)
      })
      return(resultArray);
    }

  }

  //func for ResolveField User
  async findOneUser(id: string) {
    return [this.userModel.findOne({ _id: id })];
  }

  //func for ResolveField Category
  async findCategories(id: string[]) {
    // return this.categoryModel.find({_id: id});
    // console.log(id)
    const arrayResult = [];

    for (let i = 0; i < id.length; i++) {
      if (this.categoryModel.findOne({ _id: id[i] })) {
        arrayResult.push(await this.categoryModel.findOne({ _id: id[i] }));
      }
    }
    return arrayResult;
  }

  //create article
  async createArticle(input: CreateArticleInput) {
    const articleMatchTitle = await this.articleModel.findOne({
      title: input.title,
    }); //create variable containing user with username if find

    if (!articleMatchTitle) {
      //user not find
      if (this.checkDataCreate(input)) {
        //validate
        //if all input's true, create new
        const articleAddToMongoDb = new this.articleModel(); //create new object for store

        //store field record
        articleAddToMongoDb.title = input.title;
        articleAddToMongoDb.content = input.content;
        articleAddToMongoDb.thumbnail = input.thumbnail;
        articleAddToMongoDb.userid = input.userid;
        articleAddToMongoDb.categoryid = input.categoryid;
        articleAddToMongoDb.save();

        console.log(articleAddToMongoDb.categoryid);

        //create json to respone
        const jsonRes = new JsonResponseArticle();
        jsonRes.success = true;
        jsonRes.message = 'Create new article is successfully';
        jsonRes.data = articleAddToMongoDb;
        return jsonRes;
      } else {
        //create json to respone
        const jsonRes = new JsonResponseArticle();
        jsonRes.success = false;
        jsonRes.message = 'Create article user is failed';
        return jsonRes;
      }
    } else {
      //create json to respone
      const jsonRes = new JsonResponseArticle();
      jsonRes.success = false;
      jsonRes.message = 'Title is exist in database';
      return jsonRes;
    }
  }

  //delete article
  async deleteArticle(id: string) {
    //validate
    if (await this.articleModel.findOne({ _id: id })) {
      if ((await this.articleModel.deleteOne({ _id: id })).deletedCount === 1) {
        const jsonRes = new JsonResponseArticle();
        jsonRes.success = true;
        jsonRes.message = 'Delete article successfully';
        return jsonRes;
      }
    } else {
      const jsonRes = new JsonResponseArticle();
      jsonRes.success = false;
      jsonRes.message = 'Delete article failed';
      return jsonRes;
    }
  }

  //update article
  async updateArticle(id: string, input: CreateArticleInput) {
    const currentArticle = await this.articleModel.findOne({ _id: id });
    if (currentArticle) {
      if (this.checkDataCreate(input)) {
        //validate data, if have user, update
        currentArticle.title = input.title;
        currentArticle.content = input.content;
        currentArticle.thumbnail = input.thumbnail;
        currentArticle.userid = input.userid;
        currentArticle.categoryid = input.categoryid;
        currentArticle.save();

        //create json to respone
        const jsonRes = new JsonResponseArticle();
        jsonRes.success = true;
        jsonRes.message = 'Update information of article is successfully';
        jsonRes.data = await this.articleModel.findOne({ _id: id });
        return jsonRes;
      } else {
        //create json to respone
        const jsonRes = new JsonResponseArticle();
        jsonRes.success = false;
        jsonRes.message =
          'Update information of article is failed, wrong input data';
        jsonRes.data = await this.articleModel.findOne({ _id: id });
        return jsonRes;
      }
    } else {
      const jsonRes = new JsonResponseArticle();
      jsonRes.success = false;
      jsonRes.message = 'Article is not exists in databse';
      return jsonRes;
    }
    // console.log(await this.userModel.findOne({_id: id}))
  }

  //func validate data input
  checkDataCreate(article: CreateArticleInput) {
    //username
    let flag = true;
    if (article.title.length < 6 || article.title.length > 50) flag = false;
    else if (article.content.length < 6 || article.content.length > 200)
      flag = false;
    else if (article.thumbnail.length < 6 || article.thumbnail.length > 50)
      flag = false;

    return flag;
  }
}
