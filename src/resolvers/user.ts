import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { hash, genSalt } from "bcrypt";

// Schema
import UserSchema from "../shemas/user";

// Mongoose models
import { UserModel, ISpUser } from "../models/user";

// Types
import { IError } from "src/types/shared";

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello(): String {
    return "Hello";
  }

  @Mutation(() => UserSchema)
  async register(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<ISpUser | IError> {
    try {
      const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS as string;
      const SALT = await genSalt(+SALT_ROUNDS);
      const hashedPassword = await hash(password, SALT);

      const user = new UserModel({
        name,
        email,
        password: hashedPassword
      });

      await user.save();

      return user;
    } catch (err) {
      console.log(err);
      return { message: err };
    }
  }
}
