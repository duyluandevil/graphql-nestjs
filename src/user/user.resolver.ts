/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { find } from 'rxjs';
import { User, CreateUserInput, LoginInput, JsonResponse } from './user.schema';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {} //constructor

  //Final query user
  @Query(() => [User])
  async user(@Args('limit') limit: string, @Args('search') search: string){
    return this.userService.find({ limit: Number.parseInt(limit), search: search });
  } 

  @Mutation(() => [User]) // Create User
  async createUser(@Args('input') user: CreateUserInput) {
    return this.userService.createUser(user);
  }

  @Query(() => JsonResponse) //Delete User
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
  @Query(() => JsonResponse, {nullable: true})
  async loginUser(@Args('email') email: string, @Args('password') password: string) {
    return this.userService.login({email: email, password :password});
  }
}
