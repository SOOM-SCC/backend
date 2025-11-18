const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploadEvidence");
const authMiddleware = require("../middlewares/authMiddleware");
const evidenceController = require("../controllers/evidenceController");

// [POST] /evidences
// 증거 업로드 (파일 여러 개)
router.post(
    "/",
    authMiddleware,
    upload.array("files", 10),
    evidenceController.upload
);

// [GET] /evidences/:id
// 증거 상세 조회
router.get("/:id", authMiddleware, evidenceController.getDetail);

// [PATCH] /evidences/:id
// 증거 삭제
router.patch("/:id", authMiddleware, evidenceController.delete);

module.exports = router;
