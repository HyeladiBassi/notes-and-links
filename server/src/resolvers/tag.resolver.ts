import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { TagModel, CreateTagInput, GetTagsInput, GetTagInput } from "../schema/tag.schema";
import { User } from "../schema/user.schema";
import { Tag } from "../schema/tag.schema";
import TagService from "../service/tag.service";

@Resolver()
export default class TagResolver {
  constructor(private tagService: TagService) {
    this.tagService = new TagService();
  }

  @Authorized()
  @Mutation(() => Tag)
  createTag(@Arg("input") input: CreateTagInput) {
    return this.tagService.createTag(input);
  }

  @Authorized()
  @Query(() => [Tag])
  getTags(@Arg("input") input: GetTagsInput) {
    return this.tagService.getTags(input);
  }

  @Authorized()
  @Query(() => Tag)
  getTag(@Arg("input") input: GetTagInput) {
    return this.tagService.getTag(input);
  }
}
