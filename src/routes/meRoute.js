const express = require("express");
const favoriteController = require("../controllers/favoriteController");
const evidenceController = require("../controllers/evidenceController");
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
// [GET] /me/favorites
// 내 즐겨찾기 조회
router.get("/favorites", authMiddleware, favoriteController.getMyFavorites);

/**
 * @swagger
 * /me/evidences:
 *   get:
 *     summary: 내 증거 목록 조회
 *     tags: [Me]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 조회 성공
 *       401:
 *         description: 인증 필요
 */
// [GET] /me/evidences
// 내 증거 목록 조회
router.get("/evidences", evidenceController.getMyList);

module.exports = router;
