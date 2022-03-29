/* eslint-disable prettier/prettier */
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

//import mongoose
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
@ObjectType()
export class User {
  @Field(() => ID) //store for schema.gql with field ID
  id: number; //create field to get on graphql

  @Prop()
  @Field(() => String)
  username: string;

  @Prop()
  @Field(() => String)
  password: string;

  @Prop()
  @Field(() => String)
  email: string;

  @Prop()
  @Field(() => String)
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User); //create user schema in mongo

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

