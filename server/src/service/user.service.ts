import { CreateUserInput, LoginInput, UserModel } from "../schema/user.schema";
import Context from "../types/context";
import bcrypt from "bcrypt";
import { signJwt } from "../utils/jwt";

class UserService {
  async createUser(input: CreateUserInput) {
    return UserModel.create(input);
  }

  async login(input: LoginInput, context: Context) {
    const errorMessage = "Invalid email or password";
    // Get user by email
    const user = await UserModel.find().findByEmail(input.email).lean();
    if (!user) throw new Error(errorMessage);
    // Validate password
    const passwordIsValid = await bcrypt.compare(input.password, user.password);
    if (!passwordIsValid) throw new Error(errorMessage);
    // Sign a jwt
    const token = signJwt(user);
    context.res.cookie("accessToken", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return token;
  }
}

export default UserService;
