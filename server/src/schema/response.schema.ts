import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class DeleteResponse {
  @Field(() => String)
  _id: string;
}
