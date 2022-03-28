/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import user from 'src/data/user';
import { CreateUserInput, User } from './user.schema';

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
    return [user.find((e) => e.id.toString() == id)];
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
    user.push(nUser);
    return [nUser];
  }

  async deleteUser(id: string) {
    user.splice(Number.parseInt(id) -1, 1);
    return user;
  }

  async updateUser(uUser: CreateUserInput) {
    const currentUser = user.find(e => e.id === uUser.id);
    if(currentUser) //validate data, if have user, update
    {
        currentUser.username = uUser.username;
        currentUser.password = uUser.password;
        currentUser.email = uUser.email;
        currentUser.name = uUser.name;
        return user;
    }else{
        return [{
            "id": "not in dtb",
            "username": "not in dtb",
            "password": "not in dtb",
            "email": "not in dtb",
            "name": "not in dtb"
        }];
    }
    // console.log(currentUser)
  }
}
