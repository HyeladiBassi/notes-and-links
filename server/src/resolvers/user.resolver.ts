import { Arg, Mutation, Query, Resolver } from "type-graphql";
import {
  CreateUserInput,
  LoginInput,
  User,
  LoginResponse,
} from "../schema/user.schema";
import UserService from "../service/user.service";

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => User)
  createUser(@Arg("input") input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation(() => LoginResponse)
  login(@Arg("input") input: LoginInput) {
    return this.userService.login(input);
  }

  @Query(() => User)
  me() {
    return {
      _id: "123",
      name: "John",
      email: "john@email.com",
    };
  }
}
