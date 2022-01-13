import { ISpParticipant } from "src/types/entities/user";
import { ArgsType, Field, ID, Int } from "type-graphql";

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
  name?: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  peopleCount?: number;
}
