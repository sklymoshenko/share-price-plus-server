import { ArgsType, Field } from "type-graphql";

export interface IEventsWhere {
  id?: string;
  name?: string;
  price?: number;
  each?: number;
  peopleCount?: number;
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

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  each?: number;

  @Field({ nullable: true })
  peopleCount?: number;

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
