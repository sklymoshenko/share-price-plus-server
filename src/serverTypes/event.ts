import { ISpEvent } from "src/types/entities/event";
import { ISpLoaner, ISpParticipant } from "src/types/entities/user";
import { ArgsType, Field, ID, InputType, Int, InterfaceType, ObjectType } from "type-graphql";

@InterfaceType({ description: "Schema for participant loaner" })
export abstract class AbstractSpLoaner implements ISpLoaner {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Int)
  paid: number;
}

@ObjectType({ implements: AbstractSpLoaner })
class SpLoaner implements AbstractSpLoaner {
  id: string;
  name: string;
  paid: number;
}

@InterfaceType({ description: "Schema for event participant " })
export abstract class AbstractSpParticipant implements ISpParticipant {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Int)
  paid: number;

  @Field(() => Int)
  ows: number;

  @Field(() => Int)
  exceed: number;

  @Field(() => [SpLoaner], { defaultValue: [] })
  loaners: ISpLoaner[];
}

@ObjectType({ implements: AbstractSpParticipant })
export class SpParticipant implements AbstractSpParticipant {
  id: string;
  name: string;
  paid: number;
  ows: number;
  exceed: number;
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

@InputType()
class CreateSpLoaner implements Partial<AbstractSpLoaner> {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Int, { defaultValue: 0 })
  paid: number;
}

@InputType()
class CreateSpParticipant implements Partial<AbstractSpParticipant> {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Int, { defaultValue: 0 })
  ows: number;

  @Field(() => Int, { defaultValue: 0 })
  paid: number;

  @Field(() => Int, { defaultValue: 0 })
  exceed: number;

  @Field(() => [CreateSpLoaner], { defaultValue: [] })
  loaners: ISpLoaner[];
}

@InputType()
export class CreateEvent implements Partial<ISpEvent> {
  @Field({ nullable: true })
  name: string;

  @Field(() => [CreateSpParticipant], { defaultValue: [] })
  participants: ISpParticipant[];
}
