/* eslint-disable prettier/prettier */
import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User{
    @Field(() => ID) //store for schema.gql with field ID
    id: number; //create field to get on graphql
    
    @Field()
    username: string;

    @Field()
    password: string;

    @Field()
    email: string;

    @Field()
    name: string;
}
