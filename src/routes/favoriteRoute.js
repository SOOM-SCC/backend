const express = require("express");
const controller = require("../controllers/favoriteController");

const router = express.Router();

router.post("/", controller.addFavorite);
router.delete("/:favoriteId", controller.deleteFavorite);
router.get("/me/favorites", controller.getMyFavorites);

module.exports = router;