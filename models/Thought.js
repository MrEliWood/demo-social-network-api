const { Schema, model } = require('mongoose');

// schema to create reaction subdocument
const reactionSchema = new Schema(

    {
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    },

);

// schema to create thought model
const thoughtSchema = new Schema(

    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    },

);

// virtual for getting reaction count
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

// initialize thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
