import { Field, ObjectType, ID, Int, Root } from "type-graphql";

// Types
import { ISpEvent } from "src/types/entities/event";
import { ISpUser } from "src/types/entities/user";

@ObjectType({ description: "User Schema" })
export default class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  // Wont be in schema
  password: string;

  @Field(() => Int, { defaultValue: 0 })
  eventsCount(@Root() user: ISpUser): number {
    return user.events.length || 0;
  }

  @Field({ description: "ISO date format" })
  createdAt: Date;

  @Field({ description: "ISO date format" })
  updatedAt: Date;

  @Field(() => [ID])
  events: ISpEvent["id"][];
}
