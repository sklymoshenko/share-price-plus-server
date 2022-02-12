import { ObjectId } from "mongoose";
import { ArgsType, Field, ID } from "type-graphql";

export interface IUsersWhere {
  id?: string;
  name?: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
}

@ArgsType()
export class UsersWhere implements IUsersWhere {
  @Field({ nullable: true })
  id?: string;

  @Field(() => [ID], { nullable: true })
  _id_in?: ObjectId[];

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ description: "ISO format date", nullable: true })
  createdAt?: string;

  @Field({ description: "ISO format date", nullable: true })
  updatedAt?: string;
}
