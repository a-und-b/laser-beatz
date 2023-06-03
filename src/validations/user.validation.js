const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin', 'tester'),
  }),
};

const createUsers = {
  body: Joi.array().items(
    Joi.object().keys({
      numr: Joi.string().number().allow(null),
      quests: Joi.array().optional(),
      id: Joi.string().optional(),
      username: Joi.string().allow(null),
      createdAt: Joi.string().allow(null),
      updatedAt: Joi.string().allow(null),
      userId: Joi.string().required(),
      url: Joi.string().required(),
      theme: Joi.string().required(),
      score: Joi.number().required(),
      role: Joi.string().required().valid('user', 'admin', 'tester'),
    })
  ),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string(),
    id: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.string(),
  }),
  body: Joi.object()
    .keys({
      id: Joi.string().custom(objectId).optional(),
      email: Joi.string().email().optional(),
      password: Joi.string().custom(password).optional(),
      name: Joi.string(),
      score: Joi.number(),
      numr: Joi.number(),
      username: Joi.string(),
      theme: Joi.string(),
      role: Joi.string(),
      url: Joi.string(),
      userId: Joi.string(),
      quests: Joi.array().optional(),
    })
    .min(1),
};

const updateQuest = {
  body: Joi.object()
    .keys({
      quest: {
        id: Joi.string().custom(objectId).optional(),
        questId: Joi.string(),
        userInput: Joi.object().optional(),
        type: Joi.string().optional(),
        repeatable: Joi.boolean().optional(),
        totalFinished: Joi.number(),
        totalPoints: Joi.number(),
        pointsPerExecution: Joi.number(),
        name: Joi.string().optional(),
      },
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  createUsers,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updateQuest,
};
