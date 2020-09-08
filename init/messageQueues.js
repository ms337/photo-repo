const Queue = require("bull");
const testUserQueue = new Queue("test-user-queue");

exports.testUserQueue = testUserQueue;
