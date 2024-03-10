const express = require('express');
const { isAuthenticated } = require('../middleware/auth');
const { createPodcast } = require('../controllers/podcast');

const router = express.Router();

router.route("/createPodcast").post(isAuthenticated,createPodcast);

module.exports = router;