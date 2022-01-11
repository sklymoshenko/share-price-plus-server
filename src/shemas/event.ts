import { Field, ObjectType, ID } from "type-graphql";

@ObjectType({ description: "Event Schema" })
export default class Event {
  @Field(() => ID)
  _id: String;

  @Field()
  name: String;

  @Field()
  price: number;

  @Field({ nullable: true })
  each?: number;

  @Field({ nullable: true })
  peopleCount: number;

  @Field({ nullable: true })
  participans: number;

  @Field({ nullable: true })
  isClosed: boolean;

  @Field({ nullable: true })
  closedAt: number;

  @Field({ nullable: true })
  createdAt: number;

  @Field({ nullable: true })
  updatedAt: boolean;
}
