import { Arg, Args, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { hash, genSalt, compare } from "bcrypt";
import { Types } from "mongoose";

// Schema
import UserSchema from "../shemas/user";

// Mongoose models
import { UserModel } from "../models/user";

// Types
import { ISpUser } from "src/types/entities/user";
import { IContext } from "src/types/shared";

// Server types
import { UsersWhere } from "../serverTypes/user";
import { UserInputError } from "apollo-server-express";

@Resolver(UserSchema)
export class UserResolver {
  @Query(() => UserSchema)
  async currentUser(@Ctx() ctx: IContext): Promise<ISpUser | null> {
    try {
      if (!ctx.req.session!.userId) {
        throw new Error("No loged user");
      }

      return await UserModel.findOne({ id: new Types.ObjectId(ctx.req.session!.userId) });
    } catch (err) {
      throw new Error(err);
    }
  }

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
        filter._id = userWhere.id;
      }

      if (userWhere._id_in) {
        filter._id = { $in: userWhere._id_in };
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
    @Arg("password") password: string,
    @Ctx() ctx: IContext
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

      ctx.req.session!.userId = user._id.toString();

      return user;
    } catch (err) {
      console.log(err);
      throw new UserInputError(err);
    }
  }

  @Mutation(() => UserSchema, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: IContext
  ): Promise<ISpUser | null> {
    try {
      const user: ISpUser | null = await UserModel.findOne({ email });

      if (!user) {
        throw new Error("There is no user with this email");
      }

      const validPassword = compare(password, user.password);
      if (!validPassword) {
        throw new Error("Password is invalid");
      }

      ctx.req.session!.userId = user._id.toString();

      return user;
    } catch (err) {
      console.log(err);
      throw new UserInputError(err);
    }
  }

  @Mutation(() => UserSchema, { nullable: true })
  async addFriend(@Arg("email") email: string, @Arg("userId") userId: string): Promise<ISpUser | null> {
    try {
      const friend: ISpUser | null = await UserModel.findOne({ email });

      if (!friend) {
        throw new Error("There is no user with this email");
      }

      await UserModel.findOneAndUpdate({ _id: userId }, { $push: { friends: friend._id } }, { new: true });

      return friend;
    } catch (err) {
      console.log(err);
      throw new UserInputError(err);
    }
  }
}
