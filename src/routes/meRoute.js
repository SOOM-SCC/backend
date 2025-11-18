const express = require("express");
const favoriteController = require("../controllers/favoriteController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /me/favorites:
 *   get:
 *     summary: 내 즐겨찾기 목록 조회
 *     tags: [Me]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 조회 성공
 *       401:
 *         description: 인증 필요
 */
router.get("/favorites", authMiddleware, favoriteController.getMyFavorites);

module.exports = router;