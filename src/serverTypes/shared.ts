import { ArgsType, Field, Int } from "type-graphql";

interface IQueryOptions {
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
}

@ArgsType()
export class QueryOptions implements IQueryOptions {
  @Field({ nullable: true, defaultValue: "asc" })
  order?: "asc" | "desc";

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  page?: number;

  @Field(() => Int, { nullable: true, defaultValue: 30 })
  limit?: number;
}
