const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploadEvidence");
const authMiddleware = require("../middlewares/authMiddleware");
const evidenceController = require("../controllers/evidenceController");

/**
 * @swagger
 * tags:
 *   name: Evidence
 *   description: 증거 자료 업로드 및 관리
 */

/**
 * @swagger
 * /evidences:
 *   post:
 *     summary: 증거 파일 업로드
 *     description: 파일(이미지, 음성 등)을 여러 개 업로드합니다.
 *     tags: [Evidence]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - files
 *             properties:
 *               title:
 *                 type: string
 *                 description: 증거 제목
 *               content:
 *                 type: string
 *                 description: 증거 내용 / 메모
 *               files:
 *                 type: array
 *                 description: 업로드할 파일들
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: 업로드 및 저장 성공
 *       400:
 *         description: 파일이 없거나 형식이 잘못됨
 */
router.post(
    "/",
    authMiddleware,
    upload.array("files", 10),
    evidenceController.upload
);

router.post(
    "/",
    authMiddleware,
    upload.array("files", 10),
    evidenceController.upload
);

/**
 * @swagger
 * /evidences/{id}:
 *   get:
 *     summary: 증거 상세 조회
 *     tags: [Evidence]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 증거 ID
 *     responses:
 *       200:
 *         description: 조회 성공
 *       404:
 *         description: 해당 증거를 찾을 수 없음
 */
router.get("/:id", authMiddleware, evidenceController.getDetail);

/**
 * @swagger
 * /evidences/{id}:
 *   patch:
 *     summary: 증거 삭제 (Soft Delete)
 *     tags: [Evidence]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 삭제할 증거 ID
 *     responses:
 *       200:
 *         description: 삭제 성공
 *       403:
 *         description: 삭제 권한 없음 (본인 증거만 삭제 가능)
 */
router.patch("/:id", authMiddleware, evidenceController.delete);

module.exports = router;
