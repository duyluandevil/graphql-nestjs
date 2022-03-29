/* eslint-disable prettier/prettier */
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
@ObjectType()
export class Category {
  @Field(() => ID) //store for schema.gql with field ID
  id: number; //create field to get on graphql

  @Prop()
  @Field(() => String)
  name: string;

  @Prop()
  @Field(() => String)
  description: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

@InputType()
export class CreateCategoryInput{
  @Field(() => ID) //store for schema.gql with field ID
  id: number; //create field to get on graphql

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;
}

@InputType()
export class UpdateCategoryInput{
  @Field(() => ID) 
  id: number; 
  
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;
}