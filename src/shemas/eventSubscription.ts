import { IEventPayedPayload } from "src/types/entities/event";
import { ISpParticipant } from "src/types/entities/user";
import { Field, ID, Int, InterfaceType, ObjectType } from "type-graphql";

@InterfaceType({ description: "Schema subscription participant" })
export abstract class AbstractParticipant {
  @Field(() => ID)
  _id: ISpParticipant["_id"];

  @Field()
  name: string;

  @Field(() => Int)
  paid: number;

  @Field(() => Int)
  ows: number;
}

@ObjectType({ implements: AbstractParticipant })
export class Participant implements AbstractParticipant {
  _id: ISpParticipant["_id"];
  name: string;
  paid: number;
  ows: number;
}

@ObjectType({ description: "Event payed subscription payload" })
export default class EventPayed implements IEventPayedPayload {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  each: number;

  @Field(() => [Participant])
  participants: IEventPayedPayload["participants"];
}
