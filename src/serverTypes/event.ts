import { ISpLoaner, ISpParticipant } from "src/types/entities/user";
import { ArgsType, Field, ID, Int, InterfaceType } from "type-graphql";

@InterfaceType({ description: "Schema for participant loaner" })
export abstract class SpLoaner implements ISpLoaner {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  paid: number;
}

@InterfaceType({ description: "Schema for event participant " })
export abstract class SpParticipant implements ISpParticipant {
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

export interface IEventsWhere {
  id?: string;
  name?: string;
  price?: number;
  each?: number;
  peopleCount?: number;
  participans?: ISpParticipant["id"][];
  isClosed?: boolean;
  closedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

@ArgsType()
export class EventsWhere implements IEventsWhere {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field(() => Int, { nullable: true })
  price?: number;

  @Field(() => Int, { nullable: true })
  each?: number;

  @Field(() => Int, { nullable: true })
  peopleCount?: number;

  @Field(() => [ID], { nullable: true })
  participants?: ISpParticipant["id"][];

  @Field({ nullable: true })
  isClosed?: boolean;

  @Field({ description: "UTC format date", nullable: true })
  closedAt?: string;

  @Field({ description: "UTC format date", nullable: true })
  createdAt?: string;

  @Field({ description: "UTC format date", nullable: true })
  updatedAt?: string;
}

@ArgsType()
export class CreateEvent implements IEventsWhere {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  price: number;

  @Field({ nullable: true })
  peopleCount?: number;

  @Field(() => [SpParticipant])
  participants: ISpParticipant[];
}
