const express = require("express");
const controller = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// 회원가입
router.post("/signup", controller.signup);

// 로그인
router.post("/login", controller.login);

// 로그아웃 (인증 필요)
router.post("/logout", authMiddleware, controller.logout);

// 회원 탈퇴 (인증 필요)
router.delete("/withdraw", authMiddleware, controller.withdraw);

module.exports = router;

