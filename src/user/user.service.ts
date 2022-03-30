/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import user from 'src/data/user';
import { CreateUserInput, JsonResponse, LoginInput, User, UserDocument } from './user.schema';

//Encrypt with MD5
import {Md5} from "md5-typescript";

//mongoose
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  user: Partial<User>[];
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
  }

  async find(query){
    const {
      limit,
      search
    } = query;

    if(!query.limit){ 
      //if limit is null return with 10 record
      if(!query.search){
        return this.userModel.find().limit(10);
      }else{
        return this.userModel.find({"name": new RegExp(query.search) }).limit(10);
      }

    }else{
      //if limit is not null return with limit transmisstion
      if(!query.search){
        return this.userModel.find().limit(query.limit);
      }else{
        return this.userModel.find({ "name": new RegExp(query.search) }).limit(query.limit);
      }
    }
  }

  async createUser(nUser: CreateUserInput) {
    if (this.checkDataCreate(nUser)) { //validate
      //if all input's true, create new
      const userAddToMongoDb = new this.userModel(); //create new object for store

      //store field record
      userAddToMongoDb.username = nUser.username;
      userAddToMongoDb.email = nUser.email;
      userAddToMongoDb.name = nUser.name;

      //Encrypt password by MD5 and assignment to record
      userAddToMongoDb.password = Md5.init(nUser.password);
      
      return [userAddToMongoDb.save()]
    }
    throw new Error("Wrong data input");
  }

  async deleteUser(id: string) {
    if((await this.userModel.deleteOne({ _id: id })).deletedCount === 1){
      const jsonRes = new JsonResponse();
      jsonRes.success = true;
      jsonRes.message = "Delete user successfully";
      return jsonRes;
    }
    else{
      const jsonRes = new JsonResponse();
      jsonRes.success = false;
      jsonRes.message = "Delete user failed";
      return jsonRes;
    }
  }

  async updateUser(id: string, uUser: CreateUserInput) {
    const currentUser = await this.userModel.findOne({_id: id});
    if (currentUser) {
      if (this.checkDataCreate(uUser)) {
        
        //validate data, if have user, update
        currentUser.username = uUser.username;
        currentUser.email = uUser.email;
        currentUser.name = uUser.name;

        //encrypt passowrd and assignment to record
        currentUser.password = Md5.init(uUser.password);
        return [currentUser.save()];

      }else{
        throw new Error("Wrong data input");
      }
    } else {
      throw new Error("Cannot find user in database");
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
    else if (user.name.length < 6 || user.name.length > 20) flag = false;

    return flag;
  }

    //func validate data input
    checkDataUpdate(user: User) {
      //username
      let flag = true;
      if (user.username.length < 6 || user.username.length > 20) flag = false;
      else if (user.password.length < 6 || user.password.length > 20)
        flag = false;
      else if (user.name.length < 6 || user.name.length > 20) flag = false;
  
      return flag;
    }

  //Login
  async login(query) {
    const {
      email,
      password
    } = query
    // Find our user
    const user = await this.userModel
      .findOne({email: query.email, password: Md5.init(query.password)});

    // Check that user exists
    // Validate user
    if(user){
      const jsonRes = new JsonResponse();
      jsonRes.success = true;
      jsonRes.message = "User logged in successfully";
      jsonRes.data = user;
      return jsonRes;

    }else{
      const jsonRes = new JsonResponse();
      jsonRes.success = false;
      jsonRes.message = "User logged in failed";
      jsonRes.data = user;
      return jsonRes;
    }
  }

}
