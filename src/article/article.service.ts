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
    if(query.page && isNaN(query.page)) {
      throw new Error('Param page is not number');
    }
    if(query.limit && isNaN(query.limit)) {
      throw new Error('Param limit is not number');
    }
    //is limit exists?
    if(!query.limit) { //limit is null
      //is search exists?
      if(!query.search) { //search is null
        if (!query.page){ // page is null 
          if(query.userid && !query.categoryid){ //limit null, search null, page null, category null, userid NOT NULL
            const array = await this.articleModel.find().limit(10); //delcare array stores article
            const resultArray = []; // delcare array stores end result
            array.forEach(e=> {
              if(e.userid == query.userid) //find article which match userid
              resultArray.push(e)
            } )
            return resultArray 
          }
          else if(!query.userid && query.categoryid){//limit null, search null, page null, category NOT NULL, userid null
            console.log("Filter by category")
          }
          else if(!query.userid && !query.categoryid){//limit null, search null, page null, category null, userid null
            return this.articleModel.find().limit(10);
          }
        }
        else{ //page is not null return all user with default limit
          if(query.userid && !query.categoryid){ //limit null, search null, page NOT NULL, category null, userid NOT NULL

            const array = await this.articleModel
            .find()
            .limit(10)
            .skip(5 * Number.parseInt(query.page)); //delcare array stores article
            const resultArray = []; // delcare array stores end result
            array.forEach(e=> {
              if(e.userid == query.userid) //find article which match userid
              resultArray.push(e)
            } )
            return resultArray
          }
          else if(!query.userid && query.categoryid){//limit null, search null, page NOT NULL, category NOT NULL, userid null
            console.log("Filter by category and with page")
          }
          else if(!query.userid && !query.categoryid){//limit null, search null, page NOT NULL, category null, userid null
            return this.articleModel.find().limit(10).skip(5 * Number.parseInt(query.page));
          }
        }
      } else { //search is not null
        if(!query.page){ //page is null
          if(query.userid && !query.categoryid){ //limit null, page null, search not null, categoryid null, userid not null
            const array = await this.articleModel
            .find({ title: new RegExp(query.search) })
            .limit(10); //delcare array stores article
            const resultArray = []; // delcare array stores end result
            array.forEach(e=> {
              if(e.userid == query.userid) //find article which match userid
              resultArray.push(e)
            } )
            return resultArray
          }
          else if(!query.userid && query.categoryid){//limit null, page null, search null, categoryid not null, userid not null
            console.log("Filter by category")
          }
          else if(!query.userid && !query.categoryid){//limit null, page null, search null, categoryid null, userid  null
            return this.articleModel
            .find({ title: new RegExp(query.search) })
            .limit(10);
          }
        }
        else{ //page is not null
          if(query.userid && !query.categoryid){ //limit null, search not null, page NOT NULL, category null, userid NOT NULL
            const array = await this.articleModel
            .find({ title: new RegExp(query.search) })
            .limit(10)
            .skip(5 * Number.parseInt(query.page)); //delcare array stores article
            const resultArray = []; // delcare array stores end result
            array.forEach(e=> {
              if(e.userid == query.userid) //find article which match userid
              resultArray.push(e)
            } )
            return resultArray
          }
          else if(!query.userid && query.categoryid){//limit null, search not null, page NOT NULL, category not null, userid NULL
            console.log("Filter by category")
          }
          else if(!query.userid && !query.categoryid){//limit null, search not null, page NOT NULL, category null, userid NULL
            return this.articleModel
            .find({ title: new RegExp(query.search) })
            .limit(10)
            .skip(5 * Number.parseInt(query.page));
          }
        }
      }
    } else{ //limit is not null
      if(!query.search) { //search is null
        if (!query.page){ //page is null
          if(query.userid && !query.categoryid){ //limit not null, page null, search null, categoryid null, userid not null
            const array = await this.articleModel.find().limit(Number.parseInt(query.limit)); //delcare array stores article
            const resultArray = []; // delcare array stores end result
            array.forEach(e=> {
              if(e.userid == query.userid) //find article which match userid
              resultArray.push(e)
            } )
            return resultArray
          }
          else if(!query.userid && query.categoryid){//limit not null, page null, search null, categoryid not null, userid null
            console.log("Filter by category")
          }
          else if(!query.userid && !query.categoryid){//limit not null, page null, search null, categoryid null, userid null
            return this.articleModel.find().limit(Number.parseInt(query.limit));
          }
        }
        else{ //page is NOT NULL
          if(query.userid && !query.categoryid){ //limit not null, page not null, search null, categoryid null, userid not null
            const array = await this.articleModel
            .find()
            .limit(Number.parseInt(query.limit))
            .skip(5 * Number.parseInt(query.page)); 
            
            const resultArray = []; // delcare array stores end result
            array.forEach(e=> {
              if(e.userid == query.userid) //find article which match userid
              resultArray.push(e)
            } )
            return resultArray
            // console.log(array)
          }
          else if(!query.userid && query.categoryid){//limit not null, page not null, search null, categoryid not null, userid  null
            console.log("Filter by category")
          }
          else if(!query.userid && !query.categoryid){//limit not null, page not null, search null, categoryid null, userid  null
            return this.articleModel
            .find()
            .limit(Number.parseInt(query.limit))
            .skip(5 * Number.parseInt(query.page)); // page is not null return all user with default limit
          }
        }
      }else { //search is not null
        if (!query.page){ //page null
          if(query.userid && !query.categoryid){ //limit not null, page null, search not null, categoryid null, userid not null
            const array = await this.articleModel
            .find({ title: new RegExp(query.search) })
            .limit(Number.parseInt(query.limit)); //delcare array stores article
            const resultArray = []; // delcare array stores end result
            array.forEach(e=> {
              if(e.userid == query.userid) //find article which match userid
              resultArray.push(e)
            } )
            return resultArray 
          }
          else if(!query.userid && query.categoryid){//limit not null, page null, search not null, categoryid not null, userid  null
            console.log("Filter by category")
          }
          else if(!query.userid && !query.categoryid){//limit not null, page null, search not null, categoryid  null, userid  null
            return this.articleModel
            .find({ title: new RegExp(query.search) })
            .limit(Number.parseInt(query.limit));
          }
        }
        else{ //page not null
          if(query.userid && !query.categoryid){ //limit not null, page not null, search not null, categoryid null, userid not null
            const array = await this.articleModel
            .find({ title: new RegExp(query.search) })
            .limit(Number.parseInt(query.limit))
            .skip(5 * Number.parseInt(query.page)); //delcare array stores article
            const resultArray = []; // delcare array stores end result
            array.forEach(e=> {
              if(e.userid == query.userid) //find article which match userid
              resultArray.push(e)
            } )
            return resultArray 
          }
          else if(!query.userid && query.categoryid){ //limit not null, page not null, search not null, categoryid not null, userid null
            console.log("Filter by category")
          }
          else if(!query.userid && !query.categoryid){//limit not null, page not null, search not null, categoryid null, userid null
            return this.articleModel
            .find({ title: new RegExp(query.search) })
            .limit(Number.parseInt(query.limit))
            .skip(5 * Number.parseInt(query.page));
          }
        }
      }
    }
  }

  async findOneUser(id: string){
    return [this.userModel.findOne({_id: id})];
  }
}
