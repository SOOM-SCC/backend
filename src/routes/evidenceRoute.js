const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploadEvidence");
const evidenceController = require("../controllers/evidenceController");

// [POST] /evidences
// 증거 업로드 (파일 여러 개)
router.post("/", upload.array("files", 10), (req, res, next) =>
    evidenceController.upload(req, res, next)
);

// [GET] /evidences/:id
// 증거 상세 조회
router.get("/:id", (req, res, next) =>
    evidenceController.getDetail(req, res, next)
);

// [PATCH] /evidences/:id
// 증거 삭제
router.patch("/:id", (req, res, next) =>
    evidenceController.delete(req, res, next)
);

module.exports = router;
