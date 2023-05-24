const mongoose = require('mongoose');
const questSchema = require('./schemas/quest.schema');

/**
 * @typedef Quest
 */
const Quest = mongoose.model('Quest', questSchema);

module.exports = Quest;
