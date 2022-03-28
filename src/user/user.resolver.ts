/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { User, CreateUserInput, LoginInput } from './user.schema';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {} //constructor

  //CRUD
  @Query(() => [User])
  async user(@Args('args') args: string) {
    if (args) {
      return this.userService.findOneById(args);
    }
    return this.userService.findAll();
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
