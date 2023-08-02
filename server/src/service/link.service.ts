import { GraphQLError,  } from 'graphql';
import { LinkModel, CreateLinkInput, GetLinksInput, GetLinkInput } from "../schema/link.schema";
import { User } from "../schema/user.schema";

export default class LinkService {
  async createLink(input: CreateLinkInput & { user: User['_id'] }) {
    try {
      const host = new URL(input.url).host;

      return LinkModel.create({
        ...input,
        host 
      });
    } catch (error) {
      console.log('---error', error);
      // check if error message is invalid url and handle that
      // else throw create error
      throw new GraphQLError('Invalid url', {
        extensions: {
          code: 'INVALID_URL',
          status: 400
        }
      });
    }
  }
  
  async getLinks(input: GetLinksInput) {
    return LinkModel.find(input).lean();
  }
  
  async getLink(input: GetLinkInput) {
    return LinkModel.findOne(input).lean();
  }
}
