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
  // const filter = pick(req.query, ['name', 'role']);
  const filter = null;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  const highScoreList = [];
  result.results.forEach((resu) => {
    const { username, score, theme } = resu;
    if (username) {
      highScoreList.push({ username, score, theme });
    }
  });
  res.send(highScoreList);
});

const getQuestScores = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const users = await userService.queryUsers(filter, options);
  const scores = {};

  users.results.forEach((user) => {
    user.quests.forEach((quest) => {
      const { name, totalPoints } = quest;
      if (!scores[name]) {
        scores[name] = 0;
      }
      scores[name] += totalPoints;
    });
  });

  res.send(scores);
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
  // TODO: socket ping
  res.send(user);
});

const getPioneerShares = catchAsync(async (req, res) => {
  console.log('gps');
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const users = await userService.queryUsers(filter, options);
  const finalShares = {};

  users.results.forEach((user) => {
    const pioneerQuest = user.quests.filter((quest) => quest.questId === '4')[0];
    if (pioneerQuest.userInput && pioneerQuest.userInput.usages) {
      console.log(pioneerQuest);
      const singleUserShares = pioneerQuest.userInput.usages;
      singleUserShares.forEach((share) => {
        const { title, value } = share;

        if (!finalShares[title]) {
          finalShares[title] = {};
        }

        finalShares[title].value += value;
      });
    }
  });

  res.send(finalShares);
});

const getIdeas = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const users = await userService.queryUsers(filter, options);
  const ideas = [];

  users.results.forEach((user) => {
    const ideaQuest = user.quests.filter((quest) => quest.questId === '1')[0];
    if (ideaQuest.userInput && ideaQuest.userInput.ideas) {
      ideaQuest.userInput.ideas.forEach((idea) => {
        ideas.push({
          idea,
          user: user.username,
        });
      });
    }
  });

  res.send(ideas);
});

module.exports = {
  createUser,
  createUsers,
  getUsers,
  getHighscores,
  getQuestScores,
  getUser,
  updateUser,
  deleteUser,
  updateQuest,
  getPioneerShares,
  getIdeas,
};
