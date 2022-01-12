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

  @Field({ nullable: true })
  participans: number;

  @Field({ defaultValue: false })
  isClosed: boolean;

  @Field({ nullable: true })
  closedAt: string;

  @Field()
  createdAt: string;

  @Field({ nullable: true })
  updatedAt: string;
}
