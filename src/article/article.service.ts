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
import { User, UserDocument } from 'src/user/user.schema';
import { Category, CategoryDocument } from 'src/category/category.schema';

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

    //Check all params transmission
    if (!query.limit) {
      //limit is null
      //is search exists?
      if (!query.search) {
        //search is null
        if (!query.page) {
          // page is null
          if (query.userid && !query.categoryid) {
            //limit null, search null, page null, category null, userid NOT NULL
            const array = await this.articleModel.find().limit(10); //delcare array stores article
            const resultArray = []; // delcare array stores end result
            array.forEach((e) => {
              if (e.userid == query.userid)
                //find article which match userid
                resultArray.push(e);
            });
            return resultArray;
          } else if (!query.userid && query.categoryid) {
            //limit null, search null, page null, category NOT NULL, userid null
            console.log('Filter by category');
          } else if (!query.userid && !query.categoryid) {
            //limit null, search null, page null, category null, userid null
            return this.articleModel.find().limit(10);
          }
        } else {
          //page is not null return all user with default limit
          if (query.userid && !query.categoryid) {
            //limit null, search null, page NOT NULL, category null, userid NOT NULL

            const array = await this.articleModel
              .find()
              .limit(10)
              .skip(5 * Number.parseInt(query.page)); //delcare array stores article
            const resultArray = []; // delcare array stores end result
            array.forEach((e) => {
              if (e.userid == query.userid)
                //find article which match userid
                resultArray.push(e);
            });
            return resultArray;
          } else if (!query.userid && query.categoryid) {
            //limit null, search null, page NOT NULL, category NOT NULL, userid null
            console.log('Filter by category and with page');
          } else if (!query.userid && !query.categoryid) {
            //limit null, search null, page NOT NULL, category null, userid null
            return this.articleModel
              .find()
              .limit(10)
              .skip(5 * Number.parseInt(query.page));
          }
        }
      } else {
        //search is not null
        if (!query.page) {
          //page is null
          if (query.userid && !query.categoryid) {
            //limit null, page null, search not null, categoryid null, userid not null
            const array = await this.articleModel
              .find({ title: new RegExp(query.search) })
              .limit(10); //delcare array stores article
            const resultArray = []; // delcare array stores end result
            array.forEach((e) => {
              if (e.userid == query.userid)
                //find article which match userid
                resultArray.push(e);
            });
            return resultArray;
          } else if (!query.userid && query.categoryid) {
            //limit null, page null, search null, categoryid not null, userid not null
            console.log('Filter by category');
          } else if (!query.userid && !query.categoryid) {
            //limit null, page null, search null, categoryid null, userid  null
            return this.articleModel
              .find({ title: new RegExp(query.search) })
              .limit(10);
          }
        } else {
          //page is not null
          if (query.userid && !query.categoryid) {
            //limit null, search not null, page NOT NULL, category null, userid NOT NULL
            const array = await this.articleModel
              .find({ title: new RegExp(query.search) })
              .limit(10)
              .skip(5 * Number.parseInt(query.page)); //delcare array stores article
            const resultArray = []; // delcare array stores end result
            array.forEach((e) => {
              if (e.userid == query.userid)
                //find article which match userid
                resultArray.push(e);
            });
            return resultArray;
          } else if (!query.userid && query.categoryid) {
            //limit null, search not null, page NOT NULL, category not null, userid NULL
            console.log('Filter by category');
          } else if (!query.userid && !query.categoryid) {
            //limit null, search not null, page NOT NULL, category null, userid NULL
            return this.articleModel
              .find({ title: new RegExp(query.search) })
              .limit(10)
              .skip(5 * Number.parseInt(query.page));
          }
        }
      }
    } else {
      //limit is not null
      if (!query.search) {
        //search is null
        if (!query.page) {
          //page is null
          if (query.userid && !query.categoryid) {
            //limit not null, page null, search null, categoryid null, userid not null
            const array = await this.articleModel
              .find()
              .limit(Number.parseInt(query.limit)); //delcare array stores article
            const resultArray = []; // delcare array stores end result
            array.forEach((e) => {
              if (e.userid == query.userid)
                //find article which match userid
                resultArray.push(e);
            });
            return resultArray;
          } else if (!query.userid && query.categoryid) {
            //limit not null, page null, search null, categoryid not null, userid null
            console.log('Filter by category');
          } else if (!query.userid && !query.categoryid) {
            //limit not null, page null, search null, categoryid null, userid null
            return this.articleModel.find().limit(Number.parseInt(query.limit));
          }
        } else {
          //page is NOT NULL
          if (query.userid && !query.categoryid) {
            //limit not null, page not null, search null, categoryid null, userid not null
            const array = await this.articleModel
              .find()
              .limit(Number.parseInt(query.limit))
              .skip(5 * Number.parseInt(query.page));

            const resultArray = []; // delcare array stores end result
            array.forEach((e) => {
              if (e.userid == query.userid)
                //find article which match userid
                resultArray.push(e);
            });
            return resultArray;
            // console.log(array)
          } else if (!query.userid && query.categoryid) {
            //limit not null, page not null, search null, categoryid not null, userid  null
            console.log('Filter by category');
          } else if (!query.userid && !query.categoryid) {
            //limit not null, page not null, search null, categoryid null, userid  null
            return this.articleModel
              .find()
              .limit(Number.parseInt(query.limit))
              .skip(5 * Number.parseInt(query.page)); // page is not null return all user with default limit
          }
        }
      } else {
        //search is not null
        if (!query.page) {
          //page null
          if (query.userid && !query.categoryid) {
            //limit not null, page null, search not null, categoryid null, userid not null
            const array = await this.articleModel
              .find({ title: new RegExp(query.search) })
              .limit(Number.parseInt(query.limit)); //delcare array stores article
            const resultArray = []; // delcare array stores end result
            array.forEach((e) => {
              if (e.userid == query.userid)
                //find article which match userid
                resultArray.push(e);
            });
            return resultArray;
          } else if (!query.userid && query.categoryid) {
            //limit not null, page null, search not null, categoryid not null, userid  null
            console.log('Filter by category');
          } else if (!query.userid && !query.categoryid) {
            //limit not null, page null, search not null, categoryid  null, userid  null
            return this.articleModel
              .find({ title: new RegExp(query.search) })
              .limit(Number.parseInt(query.limit));
          }
        } else {
          //page not null
          if (query.userid && !query.categoryid) {
            //limit not null, page not null, search not null, categoryid null, userid not null
            const array = await this.articleModel
              .find({ title: new RegExp(query.search) })
              .limit(Number.parseInt(query.limit))
              .skip(5 * Number.parseInt(query.page)); //delcare array stores article
            const resultArray = []; // delcare array stores end result
            array.forEach((e) => {
              if (e.userid == query.userid)
                //find article which match userid
                resultArray.push(e);
            });
            return resultArray;
          } else if (!query.userid && query.categoryid) {
            //limit not null, page not null, search not null, categoryid not null, userid null
            console.log('Filter by category');
          } else if (!query.userid && !query.categoryid) {
            //limit not null, page not null, search not null, categoryid null, userid null
            return this.articleModel
              .find({ title: new RegExp(query.search) })
              .limit(Number.parseInt(query.limit))
              .skip(5 * Number.parseInt(query.page));
          }
        }
      }
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

        console.log(articleAddToMongoDb.categoryid)

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
  async updateArticle(id: string, input: CreateArticleInput){
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
    else if (article.thumbnail.length < 6 || article.thumbnail.length > 50) flag = false;

    return flag;
  }

}
