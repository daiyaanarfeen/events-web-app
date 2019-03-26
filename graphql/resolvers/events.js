const { dateToString } = require('../../helpers/date');
const Event = require('../../models/event');

const { transformEvent } = require('./merge');

module.exports = {
    events: async () => {
        try {
            const events = await Event.find();
            return events.map(event => {
                return transformEvent(event);
            });
        } catch(err) {
            throw err;
        };
    },
    createEvent: async args => {
        // const event = {
        //     _id: Math.random().toString(),
        //     title: args.eventInput.title,
        //     description: args.eventInput.description,
        //     price: +args.eventInput.price,
        //     date:  args.eventInput.date
        // };
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date:  new Date(args.eventInput.date),
            creator: '5c995b38ad5d1f3afbf0549e'
        });
        let createdEvent;
        try {
            const result = await event.save()

            createdEvent = transformEvent(result);

            const creator = await User.findById('5c995b38ad5d1f3afbf0549e');
            if (!creator) {
                throw new Error('User not found.');
            }

            creator.createdEvents.push(event);
            await creator.save();

            return createdEvent;
        } catch(err) {
                console.log(err);
                throw err;
        };
    }
};