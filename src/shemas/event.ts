import { Field, ObjectType, ID, Root } from "type-graphql";

// Types
import { ISpParticipant } from "src/types/entities/user";

// Abstract classes
import { SpParticipant } from "../serverTypes/event";
import { ISpEvent } from "src/types/entities/event";

@ObjectType({ description: "Event Schema" })
export default class Event {
  @Field(() => ID)
  _id: String;

  @Field()
  name: String;

  @Field()
  price: number;

  @Field()
  each(@Root() event: ISpEvent): number {
    return Math.floor(event.price / event.participants.length);
  }

  @Field()
  peopleCount(@Root() event: ISpEvent): number {
    return event.participants.length;
  }

  @Field(() => [SpParticipant], { defaultValue: [] })
  participants: ISpParticipant[];

  @Field({ defaultValue: false })
  isClosed: boolean;

  @Field({ nullable: true, description: "ISO date format" })
  closedAt: Date;

  @Field()
  createdAt: Date;

  @Field({ nullable: true, description: "ISO date format" })
  updatedAt: Date;
}
