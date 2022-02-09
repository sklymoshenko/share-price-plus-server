import { IEventPayedPayload } from "src/serverTypes/event";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType({ description: "Event payed subscription payload" })
export default class EventPayed implements IEventPayedPayload {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  each: number;
}
