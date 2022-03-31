/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import user from 'src/data/user';
import {
  CreateUserInput,
  JsonResponse,
  LoginInput,
  User,
  UserDocument,
} from './user.schema';

//Encrypt with MD5
import { Md5 } from 'md5-typescript';

//mongoose
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  user: Partial<User>[];
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  //1 page chứa 5 records

  //CRUD
  //find for read
  async find(query) {
    const { page, limit, search } = query;

    //validate data
    if (query.page && isNaN(query.page)) {
      throw new Error('Param page is not number');
    }
    if (query.limit && isNaN(query.limit)) {
      throw new Error('Param limit is not number');
    }

    const skip = (query.page-1) * query.limit;
    const queryparam: any = {  }
    if(query.search){
      queryparam.name = query.search;
    }

    if(query.userid && query.userid > 0)
      queryparam.userid = query.userid;

    const array =  await this.userModel.find({ "name": new RegExp(queryparam.name), "userid": queryparam.userid }).limit( query.limit ).skip( skip )  

    return array;
  }

  //create new user
  async createUser(nUser: CreateUserInput) {
    const userMatchUsername = await this.userModel.findOne({
      username: nUser.username,
    }); //create variable containing user with username if find
    const userMatchEmail = await this.userModel.findOne({ email: nUser.email }); //create variable containing user with email if find

    if (!userMatchUsername && !userMatchEmail) {
      //user not find
      if (this.checkDataCreate(nUser)) {
        //validate
        //if all input's true, create new
        const userAddToMongoDb = new this.userModel(); //create new object for store

        //store field record
        userAddToMongoDb.username = nUser.username;
        userAddToMongoDb.email = nUser.email;
        userAddToMongoDb.name = nUser.name;

        //Encrypt password by MD5 and assignment to record
        userAddToMongoDb.password = Md5.init(nUser.password);
        userAddToMongoDb.save();

        //create json to respone
        const jsonRes = new JsonResponse();
        jsonRes.success = true;
        jsonRes.message = 'Create new user is successfully';
        jsonRes.data = userAddToMongoDb;
        return jsonRes;
      } else {
        //create json to respone
        const jsonRes = new JsonResponse();
        jsonRes.success = false;
        jsonRes.message = 'Create new user is failed';
        return jsonRes;
      }
    } else {
      //create json to respone
      const jsonRes = new JsonResponse();
      jsonRes.success = false;
      jsonRes.message = 'Email or username is exist in database';
      return jsonRes;
    }
  }

  //delete user in database
  async deleteUser(id: string) {
    //validate
    if (await this.userModel.findOne({ _id: id })) {
      if ((await this.userModel.deleteOne({ _id: id })).deletedCount === 1) {
        const jsonRes = new JsonResponse();
        jsonRes.success = true;
        jsonRes.message = 'Delete user successfully';
        return jsonRes;
      }
    } else {
      const jsonRes = new JsonResponse();
      jsonRes.success = false;
      jsonRes.message = 'Delete user failed';
      return jsonRes;
    }
  }

  //update information in database
  async updateUser(id: string, uUser: CreateUserInput) {
    const currentUser = await this.userModel.findOne({ _id: id });
    if (currentUser) {
      if (this.checkDataCreate(uUser)) {
        //validate data, if have user, update
        currentUser.username = uUser.username;
        currentUser.email = uUser.email;
        currentUser.name = uUser.name;

        //encrypt passowrd and assignment to record
        currentUser.password = Md5.init(uUser.password);
        currentUser.save();

        //create json to respone
        const jsonRes = new JsonResponse();
        jsonRes.success = true;
        jsonRes.message = 'Update information of user is successfully';
        jsonRes.data = await this.userModel.findOne({ _id: id });
        return jsonRes;
      } else {
        //create json to respone
        const jsonRes = new JsonResponse();
        jsonRes.success = false;
        jsonRes.message =
          'Update information of user is failed, wrong input data';
        jsonRes.data = await this.userModel.findOne({ _id: id });
        return jsonRes;
      }
    } else {
      const jsonRes = new JsonResponse();
      jsonRes.success = false;
      jsonRes.message = 'User is not exists in databse';
      return jsonRes;
    }
    // console.log(await this.userModel.findOne({_id: id}))
  }

  //func validate data input
  checkDataCreate(user: CreateUserInput) {
    //username
    let flag = true;
    if (user.username.length < 6 || user.username.length > 20) flag = false;
    else if (user.password.length < 6 || user.password.length > 20)
      flag = false;
    else if (user.name.length < 6 || user.name.length > 30) flag = false;

    return flag;
  }

  //Login
  async login(query) {
    const { email, password } = query;
    // Find our user
    const user = await this.userModel.findOne({
      email: query.email,
      password: Md5.init(query.password),
    });

    // Check that user exists
    // Validate user
    if (user) {
      const jsonRes = new JsonResponse();
      jsonRes.success = true;
      jsonRes.message = 'User logged in successfully';
      jsonRes.data = user;
      return jsonRes;
    } else {
      const jsonRes = new JsonResponse();
      jsonRes.success = false;
      jsonRes.message = 'User logged in failed';
      jsonRes.data = user;
      return jsonRes;
    }
  }
}
