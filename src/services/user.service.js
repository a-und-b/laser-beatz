const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (userBody.email) {
    if (await User.isEmailTaken(userBody.email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
  }
  return User.create(userBody);
};

/**
 * Create several users
 * @param {Array} users
 * @returns {Array<Promise<User>>}
 */
const createUsers = async (users) => {
  const createdUsers = [];
  users.forEach(async (userBody) => {
    createdUsers.push(User.create(userBody));
  });
  return createdUsers;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserByUserId = async (userId) => {
  console.log('GET BY USERID', userId);
  return User.findOne({ userId });
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findOne(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserByUserId = async (userId, updateBody) => {
  const user = await getUserByUserId(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

/**
 * Update user quests by id
 * @param {ObjectId} userId
 * @param {Quest} updatedQuestData
 * @returns {Promise<User>}
 */
const updateUserQuestById = async (userId, updatedQuestData) => {
  const user = await getUserByUserId(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const { questId, userInput, pointsPerExecution } = updatedQuestData;

  console.log('USER INPUT 1', userInput);

  const [questsToUpdate, remainingQuests] = user.quests.reduce(
    (result, quest) => {
      result[quest.questId === questId ? 0 : 1].push(quest);
      return result;
    },
    [[], []]
  );

  const questToUpdate = questsToUpdate[0];

  if (questToUpdate.totalFinished === 1 && !questToUpdate.repeatable) {
    // TODO: add to response that max execution amount of quest is already reached
    return user;
  }

  console.log('USER INPUT 2', userInput);
  
  questToUpdate.userInput = userInput;
  questToUpdate.totalFinished += 1;
  questToUpdate.totalPoints += pointsPerExecution;
  
  console.log('USER INPUT 3', questToUpdate.userInput);
  console.log('QTU', questToUpdate);
  
  remainingQuests.push(questToUpdate);
  console.log('RQ', remainingQuests);
  user.quests = remainingQuests;
  console.log('USER QUESTS', user.quests);
  user.score += pointsPerExecution;
  console.log('USER', user);

  await user.save();
  return user;
};

module.exports = {
  createUser,
  createUsers,
  queryUsers,
  getUserById,
  getUserByUserId,
  getUserByEmail,
  updateUserByUserId,
  updateUserById,
  deleteUserById,
  updateUserQuestById,
};
