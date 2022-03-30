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
  _id: number; //create field to get on graphql

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
  username: string;

  @Field()
  password: string;

  @Field()
  email: string;

  @Field()
  name: string;
}

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

//login json response
@ObjectType()
export class JsonResponse {

  @Field() //store for schema.gql with field ID
  success: boolean; //create field to get on graphql

  @Field()
  message: string;

  @Field(()=> User, { nullable: true })
  data: User;

}
