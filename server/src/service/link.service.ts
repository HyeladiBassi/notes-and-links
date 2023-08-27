import { GraphQLError,  } from 'graphql';
import { LinkModel, CreateLinkInput, GetLinksInput, GetLinkInput, UpdateLinkInput } from "../schema/link.schema";
import { User } from "../schema/user.schema";

export default class LinkService {
  async createLink(input: CreateLinkInput & { user: User['_id'] }) {
    try {
      const existingLink = await LinkModel.findOne({ url: input.url }).lean();
      if (existingLink) {
        throw new GraphQLError('A link with that url already exists', {
          extensions: {
            code: 'EXISTING_URL',
            status: 400
          }
        });
      }

      const host = new URL(input.url).host;

      return LinkModel.create({
        ...input,
        host
      });
    } catch (error) {
      throw error;
    }
  }

  async updateLink(input: UpdateLinkInput) {
    try {
      const host = new URL(input.url).host;

      return LinkModel.findOneAndUpdate({
        _id: input.id,
        user: input.user
      }, {
        ...input,
        host
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteLink(input: GetLinkInput) {
    return LinkModel.findOneAndDelete(input);
  }

  async getLinks(input: GetLinksInput) {
    return LinkModel.find(input).lean();
  }

  async getLink(input: GetLinkInput) {
    return LinkModel.findOne(input);
  }
}
