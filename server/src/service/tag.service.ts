import { TagModel, CreateTagInput, GetTagsInput, GetTagInput } from "../schema/tag.schema";
import { User } from "../schema/user.schema";

export default class TagService {
  async createTag(input: CreateTagInput & { user: User['_id'] }) {
    return TagModel.create(input);
  }
  
  async getTags(input: GetTagsInput) {
    return TagModel.find(input).lean();
  }
  
  async getTag(input: GetTagInput) {
    return TagModel.findOne(input).lean();
  }
}
