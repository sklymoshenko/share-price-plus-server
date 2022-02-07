import { Field, ObjectType } from "type-graphql";

@ObjectType({ description: "Notification Schema" })
export default class NotificationSchema {
  @Field()
  message: string;

  @Field()
  counter: number;
}
