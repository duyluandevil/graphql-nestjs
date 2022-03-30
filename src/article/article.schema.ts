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
  @Field(() => ID) //store for schema.gql with field ID
  id: number; //create field to get on graphql

  @Prop()
  @Field(() => String)
  title: string;

  @Prop()
  @Field(() => String)
  content: string;

  @Prop()
  @Field(() => String)
  thumbnail: string;

  @Prop()
  @Field(() => String)
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Field(() => User)
  userid: User | string;

  @Prop({type: [String]}) //create array in mongodb
  @Field(() => [String])
  categoryid:  [string];
}

export const ArticleSchema = SchemaFactory.createForClass(Article);


@InputType()
export class CreateArticleInput{
  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => String)
  thumbnail: string;

  @Field(() => String)
  status: string;

  @Field(() => String)
  userid: string;

  @Field(() => [String])
  categoryid:  [string];

}

//Json Response
@ObjectType()
export class JsonResponseArticle {

  @Field() //store for schema.gql with field ID
  success: boolean; //create field to get on graphql

  @Field()
  message: string;

  @Field(()=> Article, { nullable: true })
  data: Article;

}


