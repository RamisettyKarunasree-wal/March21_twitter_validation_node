const express = require('express');
const router = express.Router();
const tweetsController = require('../controllers/tweets');

router.get('/', tweetsController.getTweets);
router.post('/', tweetsController.postTweets);
router.delete('/:ind', tweetsController.deleteTweets);
router.delete('/', tweetsController.deleteAllTweets);
module.exports = router;
