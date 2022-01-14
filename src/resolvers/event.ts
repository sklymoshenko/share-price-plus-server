import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";

// Schema
import EventSchema from "../shemas/event";

// Mongoose models
import { EventModel } from "../models/event";
import { UserModel } from "../models/user";

// Types
import { IError } from "../types/shared";
import { ISpEvent } from "../types/entities/event";

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
        filter._id = eventsWhere.id;
      }

      if (eventsWhere.name) {
        filter.name = { $regex: String(eventsWhere.name).toLowerCase(), $options: "i" };
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

      if (eventsWhere.participants) {
        filter.participans = { id: { $in: eventsWhere.participants } };
      }

      const events: ISpEvent[] = await EventModel.find(filter);
      return events;
    } catch (err) {
      console.log(err);
      return { message: err };
    }
  }

  @Mutation(() => EventSchema)
  async createEvent(@Arg("data") eventCreate: CreateEvent): Promise<ISpEvent | IError> {
    try {
      const { name, participants } = eventCreate;
      const event = new EventModel({
        name,
        participants
      });

      for (const participant of participants) {
        await UserModel.updateOne({ id: participant.id }, { $push: { events: event._id } });
      }

      await event.save();

      return event;
    } catch (err) {
      console.log(err);
      return { message: err };
    }
  }
}
