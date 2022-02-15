import { ObjectId, Schema } from "mongoose";
import {
  IEventsWhere,
  ISpEvent,
  ISpEventHistoryItem,
  ISpEventHistoryItemChange,
  ISpEventHistoryItemChangeParticipants
} from "src/types/entities/event";
import { ISpParticipant, ISpUser } from "src/types/entities/user";
import { ArgsType, Field, ID, InputType, Int, InterfaceType, ObjectType } from "type-graphql";

@InterfaceType({ description: "Schema for participants change " })
export abstract class AbstractSpEventHistoryItemChangeParticipants implements ISpEventHistoryItemChangeParticipants {
  _id: Schema.Types.ObjectId;
  name: string;
  paid: number;
}

@ObjectType({ implements: AbstractSpEventHistoryItemChangeParticipants })
export class SpEventHistoryItemChangeParticipants implements AbstractSpEventHistoryItemChangeParticipants {
  @Field(() => ID)
  _id: Schema.Types.ObjectId;

  @Field()
  name: string;

  @Field()
  paid: number;
}
@InputType()
export class CreateSpEventHistoryItemChangeParticipants implements AbstractSpEventHistoryItemChangeParticipants {
  @Field(() => ID)
  _id: Schema.Types.ObjectId;

  @Field()
  name: string;

  @Field()
  paid: number;
}

@InterfaceType({ description: "Schema for event history item" })
export abstract class AbstractSpEventHistoryItemChange implements ISpEventHistoryItemChange {
  name?: string;
  participants?: ISpEventHistoryItemChangeParticipants[];
  closedAt?: Date;
  isClosed?: boolean;
}

@ObjectType({ implements: AbstractSpEventHistoryItemChange })
class SpEventHistoryItemChange implements AbstractSpEventHistoryItemChange {
  @Field()
  name?: string;

  @Field(() => SpEventHistoryItemChangeParticipants)
  participants?: ISpEventHistoryItemChangeParticipants[];

  @Field()
  closedAt?: Date;

  @Field()
  isClosed?: boolean;
}

@InputType()
class CreateSpEventHistoryItemChange implements AbstractSpEventHistoryItemChange {
  @Field({ nullable: true })
  name?: string;

  @Field(() => CreateSpEventHistoryItemChangeParticipants, { nullable: true })
  participants?: ISpEventHistoryItemChangeParticipants[];

  @Field({ nullable: true })
  closedAt?: Date;

  @Field()
  isClosed?: boolean;
}

@InterfaceType({ description: "Schema for event history item" })
export abstract class AbstractSpEventHistoryItem implements ISpEventHistoryItem {
  @Field(() => ID)
  _id: ISpEvent["_id"];

  @Field()
  userName: string;

  @Field(() => ID)
  userId: ISpUser["_id"];

  @Field(() => SpEventHistoryItemChange)
  change: ISpEventHistoryItem["change"];
}

@ObjectType({ implements: AbstractSpEventHistoryItem })
class SpEventHistoryItem implements AbstractSpEventHistoryItem {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  userName: string;
  change: ISpEventHistoryItem["change"];
}

@InterfaceType({ description: "Schema for event participant " })
export abstract class AbstractSpParticipant implements ISpParticipant {
  @Field(() => ID)
  _id: ISpParticipant["_id"];

  @Field()
  name: string;

  @Field(() => Int)
  paid: number;

  @Field(() => Int)
  ows: number;

  @Field(() => Int)
  exceed: number;
}

@ObjectType({ implements: AbstractSpParticipant })
export class SpParticipant implements AbstractSpParticipant {
  _id: ISpParticipant["_id"];
  name: string;
  paid: number;
  ows: number;
  exceed: number;
}

@ArgsType()
export class EventsWhere implements IEventsWhere {
  @Field(() => ID, { nullable: true })
  _id?: ObjectId;

  @Field(() => [ID], { nullable: true })
  _id_in?: ObjectId[];

  @Field({ nullable: true })
  name?: string;

  @Field(() => Int, { nullable: true })
  price?: number;

  @Field(() => Int, { nullable: true })
  each?: number;

  @Field(() => Int, { nullable: true })
  peopleCount?: number;

  @Field(() => [ID], { nullable: true })
  participants?: ISpParticipant["_id"][];

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
class CreateSpParticipant implements Partial<AbstractSpParticipant> {
  @Field(() => ID)
  _id: ObjectId;

  @Field()
  name: string;

  @Field(() => Int, { defaultValue: 0 })
  paid: number;
}

@InputType()
export class CreateEvent implements Partial<ISpEvent> {
  @Field({ nullable: true })
  name: string;

  @Field(() => [CreateSpParticipant], { defaultValue: [] })
  participants: ISpParticipant[];

  @Field({ nullable: true, defaultValue: false })
  isClosed?: boolean;
}
@InputType()
export class UpdateEvent implements Partial<SpEventHistoryItem> {
  @Field(() => ID)
  userId: ObjectId;

  @Field()
  userName: string;

  @Field(() => CreateSpEventHistoryItemChange, { defaultValue: {} })
  change: ISpEventHistoryItem["change"];
}
