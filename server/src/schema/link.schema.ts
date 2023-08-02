import {
  getModelForClass,
  index,
  prop,
  Ref
} from "@typegoose/typegoose";
import { IsUrl, MaxLength, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { User } from './user.schema';
import { v4 as uuidv4 } from 'uuid';

@ObjectType()
@index({ linkId: 1 })
export class Link {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  @prop({ required: true })
  url: string;

  @Field(() => String)
  @prop({ required: true })
  host: string;

  @Field(() => String)
  description: string;

  @Field(() => Boolean)
  hidden: boolean;

  @Field(() => String)
  @prop({ required: true, ref: () => User })
  user: Ref<User>;

  @Field(() => [String])
  tags: string[];

  @Field(() => String)
  @prop({ default: () => `link_${uuidv4()}`, unique: true })
  linkId: string;
}

export const LinkModel = getModelForClass<typeof Link>(Link);

@InputType()
export class CreateLinkInput {
  @MinLength(6, {
    message: "Title must me have least 2 characters",
  })
  @MaxLength(50, {
    message: "Title cannot be more than 50 characters;",
  })
  @Field({ nullable: true })
  title: string;

  @IsUrl()
  @Field()
  url: string;

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

  @Field(() => [String], { nullable: true })
  tags: string[];
}

@InputType()
export class GetLinksInput {
  @Field()
  user: string;
}

@InputType()
export class GetLinkInput {
  @Field()
  id: string;

  @Field()
  user: string;
}
