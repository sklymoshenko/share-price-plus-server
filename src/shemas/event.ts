import { Field, ObjectType, ID, Int } from "type-graphql";

// Types
import { ISpParticipant } from "src/types/entities/user";

// Abstract classes
import { SpEventHistoryItem, SpParticipant } from "../serverTypes/event";
import { ISpEventHistoryItem } from "src/types/entities/event";

@ObjectType({ description: "Event Schema" })
export default class Event {
  @Field(() => ID)
  _id: String;

  @Field()
  name: String;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  each: number;

  @Field(() => Int)
  peopleCount: number;

  @Field(() => [SpParticipant], { defaultValue: [] })
  participants: ISpParticipant[];

  @Field(() => [SpEventHistoryItem], { defaultValue: [] })
  history: ISpEventHistoryItem[];

  @Field({ defaultValue: false })
  isClosed: boolean;

  @Field({ nullable: true, description: "ISO date format" })
  closedAt: Date;

  @Field()
  createdAt: Date;

  @Field({ nullable: true, description: "ISO date format" })
  updatedAt: Date;
}
