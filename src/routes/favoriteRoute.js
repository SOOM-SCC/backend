const express = require("express");
const controller = require("../controllers/favoriteController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// 이전 코드 (인증 미들웨어 없음)
// router.post("/", controller.addFavorite);
// router.delete("/:favoriteId", controller.deleteFavorite);

// 현재 코드 (인증 미들웨어 적용)
router.post("/", authMiddleware, controller.addFavorite);
router.delete("/:favoriteId", authMiddleware, controller.deleteFavorite);

module.exports = router;