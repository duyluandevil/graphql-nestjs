/* eslint-disable prettier/prettier */
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID) //store for schema.gql with field ID
  id: number; //create field to get on graphql

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;
}

//Create User
@InputType()
export class CreateUserInput {
  // get data input from client
  @Field()
  id: number;

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;
}

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

