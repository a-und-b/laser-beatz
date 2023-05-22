const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const questSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            default: null,
        },
        input: {
            type: Object,
            required: false,
            default: null,
        },
    }
);

// add plugin that converts mongoose to json
questSchema.plugin(toJSON);
questSchema.plugin(paginate);

/**
 * @typedef Quest
 */
const Quest = mongoose.model('Quest', questSchema);

module.exports = Quest;
