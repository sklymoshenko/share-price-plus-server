import { ISpParticipant } from "src/types/entities/user";
import { Field, ObjectType, ID } from "type-graphql";

@ObjectType({ description: "Event Schema" })
export default class Event {
  @Field(() => ID)
  _id: String;

  @Field()
  name: String;

  @Field()
  price: number;

  @Field({ defaultValue: 0 })
  each?: number;

  @Field({ defaultValue: 0 })
  peopleCount: number;

  @Field(() => [], { nullable: true })
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
