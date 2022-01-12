import { Args, Mutation, Query, Resolver } from "type-graphql";

// Schema
import EventSchema from "../shemas/event";

// Mongoose models
import { EventModel } from "../models/event";

// Types
import { IError } from "../types/shared";
import { ISpEvent } from "src/types/entities/event";

// Server types
import { CreateEvent, EventsWhere } from "../serverTypes/event";

@Resolver(EventSchema)
export class EventResolver {
  @Query(() => [EventSchema])
  async spEventsJson(): Promise<ISpEvent[] | IError> {
    try {
      return await EventModel.find();
    } catch (err) {
      console.log(err);
      return { message: err };
    }
  }

  @Query(() => [EventSchema])
  async spEvents(@Args() eventsWhere: EventsWhere): Promise<ISpEvent[] | IError> {
    try {
      const filter: any = {};

      if (eventsWhere.id) {
        filter.id = eventsWhere.id;
      }

      if (eventsWhere.name) {
        filter.name = { $regex: String(eventsWhere.name).toLowerCase(), $options: "i" };
      }

      if (eventsWhere.price) {
        filter.price = eventsWhere.price;
      }

      if (eventsWhere.price) {
        filter.price = eventsWhere.price;
      }

      if (eventsWhere.each) {
        filter.each = eventsWhere.each;
      }

      if (eventsWhere.peopleCount) {
        filter.peopleCount = eventsWhere.peopleCount;
      }

      if (eventsWhere.isClosed) {
        filter.isClosed = eventsWhere.isClosed;
      }

      if (eventsWhere.participans) {
        filter.participans = { id: { $in: eventsWhere.participans } };
      }

      const events: ISpEvent[] = await EventModel.find(filter);
      return events;
    } catch (err) {
      console.log(err);
      return { message: err };
    }
  }

  @Mutation(() => EventSchema)
  async createEvent(@Args() eventCreate: CreateEvent): Promise<ISpEvent | IError> {
    try {
      const { name, price, peopleCount } = eventCreate;
      const event = new EventModel({
        name,
        price,
        peopleCount
      });

      await event.save();

      return event;
    } catch (err) {
      console.log(err);
      return { message: err };
    }
  }
}
