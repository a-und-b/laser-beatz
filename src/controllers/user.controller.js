const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const createUsers = catchAsync(async (req, res) => {
  const users = [];

  req.body.forEach(async (userBody) => {
    try {
      const user = await userService.createUser(userBody);
      users.push(user);
    } catch (error) {
      console.error('User could not be created:', error);
    }
  });
  res.status(httpStatus.CREATED).send(users);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getHighscores = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  const highScoreList = [];
  result.results.forEach((resu) => {
    const { username, score } = resu;
    if (score > 0) {
      highScoreList.push({ username, score });
    }
  });
  result.results = highScoreList;
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserByUserId(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserByUserId(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const updateQuest = catchAsync(async (req, res) => {
  const user = await userService.updateUserQuestById(req.params.userId, req.body.quest);
  res.send(user);
});

module.exports = {
  createUser,
  createUsers,
  getUsers,
  getHighscores,
  getUser,
  updateUser,
  deleteUser,
  updateQuest,
};
