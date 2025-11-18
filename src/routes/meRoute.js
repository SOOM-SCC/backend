const express = require("express");
const favoriteController = require("../controllers/favoriteController");

const router = express.Router();

router.get("/favorites", favoriteController.getMyFavorites);

module.exports = router;