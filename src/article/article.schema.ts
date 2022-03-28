/* eslint-disable prettier/prettier */
import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLID, GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import { User } from 'src/user/user.schema';

@ObjectType()
export class Article {
  @Field(() => GraphQLID) //store for schema.gql with field ID
  id: number; //create field to get on graphql

  @Field(() => GraphQLString)
  title: string;

  @Field(() => GraphQLString)
  content: string;

  @Field(() => GraphQLString)
  thumbnail: string;

  @Field(() => GraphQLString)
  status: string;

  @Field(() => User)
  userid: User | number;
}



