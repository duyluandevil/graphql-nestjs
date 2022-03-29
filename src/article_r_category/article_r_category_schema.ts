/* eslint-disable prettier/prettier */
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Article_R_Category {
  @Field(() => ID) //store for schema.gql with field ID
  articleId: number; //create field to get on graphql

  @Field(() => ID) //store for schema.gql with field ID
  categoryId: number; //create field to get on graphql
}
