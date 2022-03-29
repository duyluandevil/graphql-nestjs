/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import user from 'src/data/user';
import internal from 'stream';
import { CreateUserInput, LoginInput, User } from './user.schema';

//Encrypt with MD5
import {Md5} from "md5-typescript";

@Injectable()
export class UserService {
  user: Partial<User>[];
  constructor() {
    this.user = user;
  }
  async findAll(limit: number) {
    //func to return all user in data with limit
    return user.slice(0, limit);
  }

  async findOneById(id: string) {
    return [user.find((e) => e.id.toString() === id)];
    // console.log(user.find(e => e.id.toString() == id))
  }

  async findWithCount(limit: number, name: string) {
    return [user.find(e=>e.name === name)].slice(0, limit);
  }

  async createUser(nUser: CreateUserInput) {
    if (this.checkData(nUser)) { //validate
      //if all input's true, create new

      nUser.password = Md5.init(nUser.password); //Encrypt password
      user.push(nUser);
      return [nUser];
    }
    throw new Error("Wrong data input");
  }

  async deleteUser(id: string) {
    user.splice(Number.parseInt(id) - 1, 1);
    return user;
  }

  async updateUser(uUser: CreateUserInput) {
    const currentUser = user.find((e) => e.id === uUser.id);
    if (currentUser) {
      if (this.checkData(currentUser)) {
        //validate data, if have user, update
        currentUser.username = uUser.username;
        currentUser.password = uUser.password;
        currentUser.email = uUser.email;
        currentUser.name = uUser.name;
        return user;
      }else{
        throw new Error("Wrong data input");
      }
    } else {
      throw new Error("Cannot find user in database");
    }
    // console.log(currentUser)
  }

  //func validate data input
  checkData(user: User) {
    //username
    let flag = true;
    if (user.username.length < 6 || user.username.length > 20) flag = false;
    else if (user.password.length < 6 || user.password.length > 20)
      flag = false;
    else if (user.name.length < 6 || user.name.length > 20) flag = false;

    return flag;
  }

  //Login
  async login({ email, password }: LoginInput) {
    // Find our user
    const user = await this.user
      .find(e=>e.email == email);

    // Check that user exists
    // Validate user
    if(!user)
      return false
    else if(Md5.init(password).toString() !== Md5.init(user.password).toString())
      return false
    // return the user
    return true;

    // console.log(password === user.password)
  }

}
