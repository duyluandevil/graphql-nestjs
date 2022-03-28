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
    if (this.checkData(nUser)) {
      //validate
      user.push(nUser);
      return [nUser];
    }
    return [
      {
        id: 'data fail',
        username: 'data fail',
        password: 'data fail',
        email: 'data fail',
        name: 'data fail',
      },
    ];

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
        return [
            {
              id: 'data fail',
              username: 'data fail',
              password: 'data fail',
              email: 'data fail',
              name: 'data fail',
            },
          ];
      }
    } else {
      return [
        {
          id: 'not in dtb',
          username: 'not in dtb',
          password: 'not in dtb',
          email: 'not in dtb',
          name: 'not in dtb',
        },
      ];
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
}
