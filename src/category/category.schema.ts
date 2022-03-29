/* eslint-disable prettier/prettier */
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Category {
  @Field(() => ID) //store for schema.gql with field ID
  id: number; //create field to get on graphql

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;
}


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