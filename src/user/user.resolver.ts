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
    if (name) {
      return this.userService.findWithCount(Number.parseInt(limit), name);
    }
    return this.userService.findAll(Number.parseInt(limit));
    // return this.userService.findWithCount(count);
  }

  @Mutation(() => [User]) // Create User
  async createUser(@Args('input') user: CreateUserInput) {
    return this.userService.createUser(user);
  }

  @Query(() => Boolean) //Delete User
  async deleteUser(@Args('_id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Mutation(() => [User]) // Update user
  async updateUser(
    @Args('_id') id: string,
    @Args('input') user: CreateUserInput,
  ) {
    return this.userService.updateUser(id, user);
  }

  //Login
  @Query(() => Boolean)
  async loginUser(@Args('email') email: string, @Args('password') password: string) {
    return this.userService.login(email, password);
  }
}
