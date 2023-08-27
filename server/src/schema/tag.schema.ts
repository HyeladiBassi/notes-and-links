import {
  getModelForClass,
  index,
  prop,
  Ref
} from "@typegoose/typegoose";
import { MaxLength, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { User } from './user.schema';
import { v4 as uuidv4 } from 'uuid';

@ObjectType()
@index({ tagId: 1 })
export class Tag {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  name: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => Boolean)
  @prop({ default: () => false })
  hidden: boolean;

  @Field(() => String)
  @prop({ required: true, ref: () => User })
  user: Ref<User>;

  @Field(() => String)
  @prop({ default: () => `tag_${uuidv4()}`, unique: true })
  tagId: string;
}

export const TagModel = getModelForClass<typeof Tag>(Tag);

@InputType()
export class CreateTagInput {
  @MinLength(6, {
    message: "Name must me have least 2 characters",
  })
  @MaxLength(50, {
    message: "Name cannot be more than 50 characters;",
  })
  @Field()
  name: string;

  @MinLength(6, {
    message: "Description must me at least 6 characters long",
  })
  @MaxLength(500, {
    message: "Description cannot be more than 500 characters",
  })
  @Field({ nullable: true })
  description: string;

  @Field()
  user: string;
}

@InputType()
export class GetTagsInput {
  @Field()
  user: string;
}

@InputType()
export class GetTagInput {
  @Field()
  _id: string;

  @Field()
  user: string;
}
