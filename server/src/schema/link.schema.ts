import {
  getModelForClass,
  index,
  prop,
  Ref
} from "@typegoose/typegoose";
import { IsAlphanumeric, IsUrl, MaxLength, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { User } from './user.schema';
import { v4 as uuidv4 } from 'uuid';
import { Tag } from "./tag.schema";

@ObjectType()
@index({ linkId: 1 })
export class Link {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String)
  @prop({ required: true })
  url: string;

  @Field(() => String)
  @prop({ required: true })
  host: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => Boolean)
  @prop({ default: () => false })
  hidden: boolean;

  @Field(() => String)
  @prop({ required: true, ref: () => User })
  user: Ref<User>;
  
  @Field(() => [String])
  @prop({ default: () => [], ref: () => Tag })
  tags?: Ref<Tag>[];

  @Field(() => String)
  @prop({ default: () => `link_${uuidv4()}`, unique: true })
  linkId: string;

  // store meta tags as well so no extra requests needed on frontend
  //
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

  @Field({ nullable: true })
  hidden: boolean;

  @Field(() => [String], { nullable: true })
  tags?: string[];
}

@InputType()
export class GetLinksInput {
  @IsAlphanumeric()
  @Field()
  user: string;
}

@InputType()
export class GetLinkInput {
  @IsAlphanumeric()
  @Field()
  id: string;

  @IsAlphanumeric()
  @Field()
  user: string;
}

@InputType()
export class UpdateLinkInput extends CreateLinkInput {
  @IsAlphanumeric()
  @Field()
  id: string;

  @IsAlphanumeric()
  @Field()
  user: string;
}
