const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const questSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    questId: {
        type: String,
        required: true,
        trim: true,
    },
    userInput: {
        type: Object,
        required: false,
        default: null,
    },
    type: {
        type: String,
        required: true,
        default: 'sideQuest'
    },
    repeatable: {
        type: Boolean,
    },
    pointsPerExecution: {
        type: Number,
    },
    totalFinished: {
        type: Number,
        default: 0
    },
    totalPoints: {
        type: Number,
        default: 0
    },
});

// add plugin that converts mongoose to json
questSchema.plugin(toJSON);
questSchema.plugin(paginate);

module.exports = questSchema;
