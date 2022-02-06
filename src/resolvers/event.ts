import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";

// Schema
import EventSchema from "../shemas/event";

// Mongoose models
import { EventModel } from "../models/event";
import { UserModel } from "../models/user";

// Types
import { ISpEvent } from "../types/entities/event";

// Server types
import { CreateEvent, EventsWhere, UpdateEvent } from "../serverTypes/event";

@Resolver(EventSchema)
export class EventResolver {
  @Query(() => [EventSchema])
  async spEventsJson(): Promise<ISpEvent[]> {
    try {
      return await EventModel.find();
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  @Query(() => [EventSchema])
  async spEvents(@Args() eventsWhere: EventsWhere): Promise<ISpEvent[]> {
    try {
      const filter: any = {};

      if (eventsWhere._id) {
        filter._id = eventsWhere._id;
      }

      if (eventsWhere._id_in) {
        filter._id = { $in: eventsWhere._id_in };
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
      throw new Error(err);
    }
  }

  @Mutation(() => EventSchema)
  async createEvent(@Arg("data") eventCreate: CreateEvent): Promise<ISpEvent> {
    try {
      const { name, participants } = eventCreate;
      const event = new EventModel({
        name,
        participants
      });
      await UserModel.updateMany({ _id: { $in: participants.map((p) => p._id) } }, { $push: { events: event._id } });

      await event.save();

      return event;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  @Mutation(() => EventSchema)
  async updateEvent(@Arg("id") id: string, @Arg("data") data: UpdateEvent) {
    try {
      const event = await EventModel.findOneAndUpdate({ _id: id }, data, { new: true });

      return event;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  @Mutation(() => EventSchema)
  async deleteEvent(@Arg("id") id: string) {
    try {
      const event = await EventModel.findOneAndDelete({ _id: id });

      if (event) {
        await UserModel.updateMany({ _id: { $in: event.participants.map((p) => p._id) } }, { $pull: { events: id } });
      }

      return event;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
}
