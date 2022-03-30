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
  async users(
    @Args('page') page: string,
    @Args('limit') limit: string,
    @Args('search') search: string,
  ) {
    return this.userService.find({ page: page, limit: limit, search: search });
  }

  //Login
  @Query(() => JsonResponse, { nullable: true })
  async loginUser(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.userService.login({ email: email, password: password });
  }

  @Mutation(() => JsonResponse)
  async mutationUsers(
    @Args('_id') id: string,
    @Args('input', { nullable:true }) input: CreateUserInput,
  ){
    //Create
    if(!id && input) return this.userService.createUser(input);
    
    //Update
    if(id && input) return this.userService.updateUser(id, input);

    //Delete
    if(id && !input) return this.userService.deleteUser(id);
  }

  @Mutation(() => JsonResponse, { nullable: true }) // Create User
  async createUser(@Args('input') input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation(() => JsonResponse, { nullable: true }) //Delete User
  async deleteUser(@Args('_id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Mutation(() => JsonResponse) // Update user
  async updateUser(
    @Args('_id') id: string,
    @Args('input') user: CreateUserInput,
  ) {
    return this.userService.updateUser(id, user);
  }
}
