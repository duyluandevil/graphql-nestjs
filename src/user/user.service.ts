/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import user from 'src/data/user';
import internal from 'stream';
import { CreateUserInput, LoginInput, User, UserDocument } from './user.schema';

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
  async findAll(limit: number) {
    //func to return all user in data with limit
    return this.userModel.find().limit(limit);
  }

  async findOneById(id: string) {
    return [user.find((e) => e.id.toString() === id)];
    // console.log(user.find(e => e.id.toString() == id))
  }

  async findWithCount(limit: number, name: string) {
    return this.userModel.find({"name": name}).limit(limit);
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
    return (await (await this.userModel.deleteOne({ _id: id })).deletedCount) === 1
      ? true
      : false;
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
  async login(email: string, password: string) {
    // Find our user
    const user = await this.userModel
      .findOne({email: email});

    // Check that user exists
    // Validate user
    if(!user)
      return false
    else if(Md5.init(password) !== user.password)
      return false
    // return the user
    return true;

    // console.log(user)
  }

}
