/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import user from 'src/data/user';
import { CreateUserInput, LoginInput, User } from './user.schema';

@Injectable()
export class UserService {
  user: Partial<User>[];
  constructor() {
    this.user = user;
  }
  async findAll() {
    //func to return all user in data
    return user;
  }

  async findOneById(id: string) {
    return [user.find((e) => e.id.toString() === id)];
    // console.log(user.find(e => e.id.toString() == id))
  }

  async findWithCount(count: number) {
    const arrayWithCount = [];
    for (let i = 0; i < count; i++) {
      arrayWithCount[i] = user[i];
    }
    return arrayWithCount;
  }

  async createUser(nUser: CreateUserInput) {
    if (this.checkData(nUser)) {
      //validate
      user.push(nUser);
      return [nUser];
    }
    throw new Error("Wrong data input");

    // console.log(this.checkData(nUser))
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
      throw new Error('Wrong email address')
    else if(password !== user.password)
      throw new Error('Wrong password')
    // return the user
    return true;

    // console.log(password === user.password)
  }

}
