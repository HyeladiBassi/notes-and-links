import UserResolver from "./user.resolver";
import LinkResolver from "./link.resolver";
import TagResolver from "./tag.resolver";

export const resolvers = [UserResolver, LinkResolver, TagResolver] as const;
