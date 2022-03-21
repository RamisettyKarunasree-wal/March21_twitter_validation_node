const { body, validationResult } = require('express-validator');
let tweets = [
  {
    title: '',
    body: '300',
    date: 'good camera',
    author: 'available',
    category: 'toys',
  },
];
function getTweets(req, res) {
  res.json(tweets);
}
const postTweets = [
  body('title')
    .trim()
    .escape()
    .isAlphanumeric()
    .withMessage('*title name should contain only numbers and alphabets')
    .isLength({ min: 5, max: 50 })
    .withMessage('*title length-min should be 5 and max should be 50'),
  body('author')
    .trim()
    .escape()
    .isAlphanumeric()
    .withMessage('*author name should contain only numbers and alphabets')
    .isLength({ min: 5, max: 100 })
    .withMessage('*Author name length- min should be 5 and max should be 100'),
  body('body')
    .trim()
    .escape()
    .isLength({ min: 5, max: 200 })
    .withMessage('body length- min should be 8 and max should be 10'),
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.json({ status: 0, debug_errors: errors });
    } else {
      console.log(req.body);
      tweets.push(req.body);
      res.json({ status: 'added tweet successfully' });
    }
  },
];

function deleteTweets(req, res) {
  let newTweets = tweets.filter((val, index) => {
    if (index === Number(req.params.ind)) {
      return false;
    } else {
      return true;
    }
  });
  tweets = newTweets;
  res.send({ status: 'deleted item successfully' });
}
function deleteAllTweets(req, res) {
  tweets = [];
  res.send({ status: 'deleted all tweets' });
}
module.exports = { getTweets, postTweets, deleteTweets, deleteAllTweets };
