import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { hash, genSalt } from "bcrypt";

// Schema
import UserSchema from "../shemas/user";

// Mongoose models
import { UserModel } from "../models/user";

// Types
import { IError } from "../types/shared";
import { ISpUser } from "src/types/entities/user";

// Server types
import { UsersWhere } from "../serverTypes/user";
import { UserInputError } from "apollo-server-express";

@Resolver(UserSchema)
export class UserResolver {
  @Query(() => [UserSchema])
  async spUsersJson(): Promise<ISpUser[]> {
    try {
      return await UserModel.find();
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  @Query(() => [UserSchema])
  async spUsers(@Args() userWhere: UsersWhere): Promise<ISpUser[]> {
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
      throw new Error(err);
    }
  }

  @Mutation(() => UserSchema, { nullable: true })
  async register(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<ISpUser> {
    try {
      const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS as string;
      const SALT = await genSalt(+SALT_ROUNDS);
      const hashedPassword = await hash(password, SALT);

      const users: ISpUser[] = await UserModel.find({ email });

      if (users.length) {
        throw new Error("Email is already in use");
      }

      const user = new UserModel({
        name,
        email,
        password: hashedPassword
      });

      await user.save();

      return user;
    } catch (err) {
      console.log(err);
      throw new UserInputError(err);
    }
  }
}
