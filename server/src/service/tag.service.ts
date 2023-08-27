import { GraphQLError } from "graphql";
import { TagModel, CreateTagInput, GetTagsInput, GetTagInput } from "../schema/tag.schema";
import { User } from "../schema/user.schema";

export default class TagService {
  async createTag(input: CreateTagInput & { user: User['_id'] }) {
    const tagName = input.name.trim();
    const existingTag = await TagModel.findOne({ name: tagName }).lean();
    if (!existingTag) {
      return TagModel.create(input);
    } else {
      throw new GraphQLError('Tag with that name already exists', {
        extensions: {
          code: 'EXISTING_TAG',
          status: 400
        }
      })
    }
  }

  async getTags(input: GetTagsInput) {
    return TagModel.find(input).lean();
  }

  async deleteTag(input: GetTagInput) {
    return TagModel.findOneAndDelete(input).lean();
  }

  async getTag(input: GetTagInput) {
    return TagModel.findOne(input).lean();
  }
}
