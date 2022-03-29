/* eslint-disable prettier/prettier */
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type Article_R_CategoryDocument = Article_R_Category & Document;

@Schema()
@ObjectType()
export class Article_R_Category {
  @Prop()
  @Field(() => ID) //store for schema.gql with field ID
  articleId: number; //create field to get on graphql

  @Prop()
  @Field(() => ID) //store for schema.gql with field ID
  categoryId: number; //create field to get on graphql
}

export const Article_R_CategorySchema = SchemaFactory.createForClass(Article_R_Category);

@InputType()
export class CreateARCInput {
  @Field(() => ID) //store for schema.gql with field ID
  articleId: number; //create field to get on graphql

  @Field(() => ID) //store for schema.gql with field ID
  categoryId: number; //create field to get on graphql
}
