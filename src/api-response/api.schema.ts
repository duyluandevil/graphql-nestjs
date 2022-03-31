/* eslint-disable prettier/prettier */
import { Field, ObjectType } from "@nestjs/graphql";

//Json Response
@ObjectType()
export class JsonResponse {

  @Field() //store for schema.gql with field ID
  success: boolean; //create field to get on graphql

  @Field()
  message: string;

  @Field(() =>Array, {nullable:true})
  data: any;

}
