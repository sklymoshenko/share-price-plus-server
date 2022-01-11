import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { hash, genSalt } from "bcrypt";

// Schema
import UserSchema from "../shemas/user";

// Mongoose models
import { UserModel, ISpUser } from "../models/user";

// Types
import { IError } from "../types/shared";

// Server types
import { UsersWhere } from "../serverTypes/user";

@Resolver(UserSchema)
export class UserResolver {
  @Query(() => [UserSchema])
  async spUsersJson(): Promise<ISpUser[] | IError> {
    try {
      return await UserModel.find();
    } catch (err) {
      console.log(err);
      return { message: err };
    }
  }

  @Query(() => [UserSchema])
  async spUsers(@Args() userWhere: UsersWhere): Promise<ISpUser[] | IError> {
    try {
      const filter: any = {};

      if (userWhere.id) {
        filter.id = userWhere.id;
      }

      if (userWhere.name) {
        filter.name = { $regex: String(userWhere.name).toLowerCase(), $options: "i" };
      }

      if (userWhere.email) {
        filter.email = { $regex: String(userWhere.email).toLowerCase(), $options: "i" };
      }

      const users: ISpUser[] = await UserModel.find(filter);
      return users;
    } catch (err) {
      console.log(err);
      return { message: err };
    }
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
