import { ISpLoaner, ISpParticipant } from "src/types/entities/user";
import { Field, ObjectType, ID, InterfaceType, Int } from "type-graphql";

@InterfaceType({ description: "Schema for participant loaner" })
abstract class SpLoaner implements ISpLoaner {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  paid: number;
}

@InterfaceType({ description: "Schema for event participant " })
abstract class SpParticipant implements ISpParticipant {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Int, { defaultValue: 0 })
  paid: number;

  @Field(() => Int, { defaultValue: 0 })
  ows: number;

  @Field(() => Int, { defaultValue: 0 })
  exceed: number;

  @Field(() => [SpLoaner], { defaultValue: [] })
  loaners: ISpLoaner[];
}

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
