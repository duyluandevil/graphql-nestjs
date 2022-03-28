/* eslint-disable prettier/prettier */
import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLID, GraphQLList, GraphQLString } from 'graphql';
import { Article } from 'src/article/article.schema';

@ObjectType()
export class User {
  @Field(() => GraphQLID) //store for schema.gql with field ID
  id: number; //create field to get on graphql

  @Field(() => GraphQLString)
  username: string;

  @Field(() => GraphQLString)
  password: string;

  @Field(() => GraphQLString)
  email: string;

  @Field(() => GraphQLString)
  name: string;
}

//Create User
@InputType()
export class CreateUserInput {
  // get data input from client
  @Field()
  id: number;

  @Field(() => GraphQLString)
  username: string;

  @Field(() => GraphQLString)
  password: string;

  @Field(() => GraphQLString)
  email: string;

  @Field(() => GraphQLString)
  name: string;
}

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

