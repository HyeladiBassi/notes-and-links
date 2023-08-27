import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { CreateLinkInput, GetLinksInput, GetLinkInput, UpdateLinkInput, Link } from "../schema/link.schema";
import { DeleteResponse } from "../schema/response.schema";
import LinkService from "../service/link.service";

@Resolver()
export default class LinkResolver {
  constructor(private linkService: LinkService) {
    this.linkService = new LinkService();
  }

  @Authorized()
  @Mutation(() => Link)
  createLink(@Arg("input") input: CreateLinkInput) {
    return this.linkService.createLink(input);
  }

  @Authorized()
  @Mutation(() => Link)
  updateLink(@Arg("input") input: UpdateLinkInput) {
    return this.linkService.updateLink(input);
  }

  @Authorized()
  @Mutation(() => DeleteResponse)
  deleteLink(@Arg("input") input: GetLinkInput) {
    return this.linkService.deleteLink(input);
  }

  @Authorized()
  @Query(() => [Link])
  links(@Arg("input") input: GetLinksInput) {
    return this.linkService.getLinks(input);
  }

  @Authorized()
  @Query(() => Link)
  link(@Arg("input") input: GetLinkInput) {
    return this.linkService.getLink(input);
  }
}
