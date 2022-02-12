import { Arg, Args, Mutation, PubSub, PubSubEngine, Query, Resolver, Root, Subscription } from "type-graphql";

// Schema
import EventSchema from "../shemas/event";
import EventPayed from "../shemas/eventSubscription";

// Mongoose models
import { EventModel } from "../models/event";
import { UserModel } from "../models/user";

// Types
import { IEventPayedPayload, ISpEvent } from "../types/entities/event";

// Server types
import { CreateEvent, EventsWhere, UpdateEvent } from "../serverTypes/event";
import { QueryOptions } from "../serverTypes/shared";

@Resolver(EventSchema)
export class EventResolver {
  @Query(() => [EventSchema])
  async spEventsJson(@Args() options: QueryOptions): Promise<ISpEvent[]> {
    try {
      const { page = 0, limit = 30, order = "asc" } = options;
      return await EventModel.find().limit(limit).skip(page).sort({ createdAt: order });
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  @Query(() => [EventSchema])
  async spEvents(@Args() eventsWhere: EventsWhere, @Args() options: QueryOptions): Promise<ISpEvent[]> {
    try {
      const { page = 0, limit = 30, order = "asc" } = options;
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

      const events: ISpEvent[] = await EventModel.find(filter)
        .limit(limit)
        .skip(page)
        .sort({ isClosed: "asc", createdAt: order });
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
  async updateEvent(@Arg("id") id: string, @Arg("data") data: UpdateEvent, @PubSub() pubSub: PubSubEngine) {
    try {
      const event = await EventModel.findOneAndUpdate({ _id: id }, data, { new: true, upsert: true })!;

      if (data.participants) {
        const participants = event!.participants.map((p) => ({ _id: p._id, ows: p.ows, paid: p.paid, name: p.name }));
        const payload: IEventPayedPayload = { total: event?.price || 0, each: event?.each || 0, participants };
        await pubSub.publish("UPDATE_EVENT_PAYED", payload);
      }

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

  @Subscription({ topics: "UPDATE_EVENT_PAYED" })
  eventPayed(@Root() eventPayedPayload: IEventPayedPayload): EventPayed {
    return eventPayedPayload;
  }
}
