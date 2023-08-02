import { CreateUserInput, LoginInput, UserModel } from "../schema/user.schema";
import Context from "../types/context";
import bcrypt from "bcrypt";
import { signJwt } from "../utils/jwt";
import { GraphQLError,  } from 'graphql';

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

    // Get user by email
    const user = await UserModel.find().findByEmail(input.email).lean();
    if (!user) {
      throw new GraphQLError(errorMessage, errorExtensions);
    }

    // Validate password
    const passwordIsValid = await bcrypt.compare(input.password, user.password);
    if (!passwordIsValid) {
      throw new GraphQLError(errorMessage, errorExtensions);
    }

    // Sign a jwt
    const token = signJwt(user);
    // context.res.cookie("accessToken", token, {
    //   maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    //   httpOnly: true,
    //   domain: "localhost",
    //   path: "/",
    //   sameSite: "strict",
    //   secure: process.env.NODE_ENV === "production",
    // });

    return { token, ...user };
  }
}

export default UserService;
