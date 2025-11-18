const express = require("express");
const controller = require("../controllers/favoriteController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /favorites:
 *   post:
 *     summary: 즐겨찾기 추가
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - shelterId
 *               - shelterName
 *             properties:
 *               shelterId:
 *                 type: integer
 *                 example: 1
 *               shelterName:
 *                 type: string
 *                 example: 서울시립보호소
 *     responses:
 *       201:
 *         description: 즐겨찾기 추가 성공
 *       401:
 *         description: 인증 필요
 */
router.post("/", authMiddleware, controller.addFavorite);

/**
 * @swagger
 * /favorites/{favoriteId}:
 *   delete:
 *     summary: 즐겨찾기 삭제
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: favoriteId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: 즐겨찾기 삭제 성공
 *       401:
 *         description: 인증 필요
 *       404:
 *         description: 즐겨찾기를 찾을 수 없음
 */
router.delete("/:favoriteId", authMiddleware, controller.deleteFavorite);

/**
 * @swagger
 * /favorites/me/favorites:
 *   get:
 *     summary: 내 즐겨찾기 목록 조회
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 조회 성공
 *       401:
 *         description: 인증 필요
 */
// router.get("/me/favorites", authMiddleware, controller.getMyFavorites);

module.exports = router;