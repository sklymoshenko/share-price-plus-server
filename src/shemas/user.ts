import { Field, ObjectType, ID } from "type-graphql";
import { IsEmail } from "class-validator";

@ObjectType({ description: "User Schema" })
export default class User {
  @Field(() => ID)
  _id: String;

  @Field()
  name: String;

  @Field()
  @IsEmail()
  email: String;

  // Wont be in schema
  password: String;

  @Field({ nullable: true })
  eventsCount: Number;

  @Field({ nullable: true })
  totallSpent: Number;

  @Field({ description: "ISO date format" })
  createdAt: Date;

  @Field({ description: "ISO date format" })
  updatedAt: Date;
}
