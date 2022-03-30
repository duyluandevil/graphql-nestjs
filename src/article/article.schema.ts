/* eslint-disable prettier/prettier */
import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLID, GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import { User } from 'src/user/user.schema';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { Category } from 'src/category/category.schema';

export type ArticleDocument = Article & Document;

@Schema()
@ObjectType()
export class Article {
  @Field(() => GraphQLID) //store for schema.gql with field ID
  id: number; //create field to get on graphql

  @Prop()
  @Field(() => GraphQLString)
  title: string;

  @Prop()
  @Field(() => GraphQLString)
  content: string;

  @Prop()
  @Field(() => GraphQLString)
  thumbnail: string;

  @Prop()
  @Field(() => GraphQLString)
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Field(() => User)
  userid: User | string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  @Field(() => [Category])
  categoryid: Category[] | string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);




