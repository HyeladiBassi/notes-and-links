import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateLinkInput, GetLinksInput, GetLinkInput, Link } from "../schema/link.schema";
import LinkService from "../service/link.service";

@Resolver()
export default class LinkResolver {
  constructor(private linkService: LinkService) {
    this.linkService = new LinkService();
  }

  @Mutation(() => Link)
  createLink(@Arg("input") input: CreateLinkInput) {
    return this.linkService.createLink(input);
  }

  @Query(() => [Link])
  getLinks(@Arg("input") input: GetLinksInput) {
    return this.linkService.getLinks(input);
  }

  @Query(() => Link)
  getLink(@Arg("input") input: GetLinkInput) {
    return this.linkService.getLink(input);
  }
}
