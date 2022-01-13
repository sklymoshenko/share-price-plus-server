import { Field, ObjectType, ID } from "type-graphql";

// Types
import { ISpParticipant } from "src/types/entities/user";

// Abstract classes
import { SpParticipant } from "../serverTypes/event";

@ObjectType({ description: "Event Schema" })
export default class Event {
  @Field(() => ID)
  _id: String;

  @Field()
  name: String;

  @Field({ defaultValue: 0 })
  price: number;

  @Field({ defaultValue: 0 })
  each?: number;

  @Field({ defaultValue: 0 })
  peopleCount: number;

  @Field(() => [SpParticipant], { defaultValue: [] })
  participans: ISpParticipant[];

  @Field({ defaultValue: false })
  isClosed: boolean;

  @Field({ nullable: true, description: "ISO date format" })
  closedAt: Date;

  @Field()
  createdAt: Date;

  @Field({ nullable: true, description: "ISO date format" })
  updatedAt: Date;
}
