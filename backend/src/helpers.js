const { randomBytes } = require('crypto');
const { readFileSync } = require('fs');

const sleep = ms => {
  return new Promise(r => setTimeout(r, ms));
};

const getRandomString = () => {
  return randomBytes(4).toString('hex');
};

const getRandomNumber = () => {
  return Math.floor(Math.random() * 100);
}

const getFileContents = file => {
  return readFileSync(file).toString();
}

module.exports = { sleep, getRandomString, getRandomNumber, getFileContents }