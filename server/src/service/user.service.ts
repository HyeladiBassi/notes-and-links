import { CreateUserInput, LoginInput, GetMeInput, UserModel } from "../schema/user.schema";
import bcrypt from "bcrypt";
import { signJwt } from "../utils/jwt";
import { GraphQLError,  } from 'graphql';
import { omit } from 'lodash';

class UserService {
  async createUser(input: CreateUserInput) {
    return UserModel.create(input);
  }

  async login(input: LoginInput) {
    const errorMessage = "Invalid email or password";
    const errorExtensions = {
      extensions: {
        code: 'VALIDATION_ERROR',
        status: 400
      }
    };

    const user = await UserModel.findOne({ email: input.email }).lean();
    if (!user) {
      throw new GraphQLError(errorMessage, errorExtensions);
    }

    const passwordIsValid = await bcrypt.compare(input.password, user.password);
    if (!passwordIsValid) {
      throw new GraphQLError(errorMessage, errorExtensions);
    }

    const token = signJwt(omit(user, 'password'));

    return { token, ...user };
  }

  // use auth context to get the user as opposed to the id
  async getMe(input: GetMeInput) {
    const errorMessage = "No User was found with that ID";
    const errorExtensions = {
      extensions: {
        code: 'VALIDATION_ERROR',
        status: 400
      }
    };

    const user = await UserModel.findOne({ _id: input.id }).lean();
    if (!user) {
      throw new GraphQLError(errorMessage, errorExtensions);
    }
    return omit(user, 'password');
  }
}

export default UserService;
