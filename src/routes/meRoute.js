const express = require("express");
const favoriteController = require("../controllers/favoriteController");
const uploadController = require("../controllers/evidenceController");

const router = express.Router();

// [GET] /me/favorites
// 내 즐겨찾기 조회
router.get("/favorites", favoriteController.getMyFavorites);

// [GET] /me/evidences
// 내 증거 목록 조회
router.get("/evidences", (req, res, next) =>
    evidenceController.getMyList(req, res, next)
);

module.exports = router;