const express = require('express');
const { isAuthenticated } = require('../middleware/auth');
const { createPodcast, addepisodes, getPodcasts, getPodcastsById, favouritePodcast,favoritPodcast, addView, random, mostPopular, getByTag, getByCategory, search } = require('../controllers/podcast');

const router = express.Router();

router.route("/").post(isAuthenticated,createPodcast);
// router.route("/episode").post(isAuthenticated, addEpisodes);
router.route("/").get(isAuthenticated,getPodcasts)

router.route("/get/:id").get(isAuthenticated,getPodcastsById)
router.route("/favourites").post(isAuthenticated,favouritePodcast)

router.route("/addview/:id").post(isAuthenticated,addView)
router.route("/random").get(isAuthenticated,random)
router.route("/mostpopular").get(isAuthenticated,mostPopular)
// router.route("/tags").get(isAuthenticated,getByTag)
router.route("/category").get(isAuthenticated,getByCategory)
router.route("/search").get(isAuthenticated,search)

module.exports = router; 