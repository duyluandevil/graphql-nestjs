/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User, CreateUserInput, LoginInput } from './user.schema';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {} //constructor

  //CRUD
  @Query(() => [User])
  async users(@Args('limit') limit: string) {
    return this.userService.findAll(Number.parseInt(limit));
    // return this.userService.findWithCount(count);
  }

  @Query(() => [User])
  async user(@Args('limit') limit: string, @Args('name') name: string) {
    if(name){
      return this.userService.findWithCount(Number.parseInt(limit), name);
    }
    return this.userService.findAll(Number.parseInt(limit));
    // return this.userService.findWithCount(count);
  }

  @Mutation(() => [User]) // Create User
  async createUser(@Args('input') user: CreateUserInput) {
    return this.userService.createUser(user);
  }

  @Query(() => [User]) //Delete User
  async deleteUser(@Args('args') args: string) {
    return this.userService.deleteUser(args);
  }

  @Mutation(()=> [User]) // Update user
  async updateUser(@Args('input') user: CreateUserInput) {
    return this.userService.updateUser(user);
  }

  //Login
  @Query(() => Boolean)
  async loginUser(@Args('input') user: LoginInput) {
    return this.userService.login(user);
  }
}
