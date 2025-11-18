const BaseService = require("../common/base.service");
const prisma = require("../utils/prisma");
const ApiError = require("../common/apiError");
const ErrorCodes = require("../constants/errorCodes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthService extends BaseService {
  constructor() {
    super(prisma.users);
  }

  // 회원가입
  async signup(email, password, name) {
    if (!email || !password || !name) {
      throw new ApiError(ErrorCodes.BAD_REQUEST, "필수 정보가 누락되었습니다.");
    }

    // 이메일 중복 체크
    const existingUser = await this.model.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ApiError(ErrorCodes.USER_ALREADY_EXISTS);
    }

    // 비밀번호 해싱
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // 사용자 생성
    const user = await this.model.create({
      data: {
        email,
        password_hash,
        name,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        created_at: true,
      },
    });

    return user;
  }

  // 로그인
  async login(email, password) {
    if (!email || !password) {
      throw new ApiError(ErrorCodes.BAD_REQUEST, "이메일과 비밀번호를 입력해주세요.");
    }

    // 사용자 조회
    const user = await this.model.findUnique({
      where: { email },
    });

    if (!user) {
      throw new ApiError(ErrorCodes.INVALID_CREDENTIALS);
    }

    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      throw new ApiError(ErrorCodes.INVALID_CREDENTIALS);
    }

    // 활성화 상태 확인
    if (!user.is_active) {
      throw new ApiError(ErrorCodes.UNAUTHORIZED, "비활성화된 계정입니다.");
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  // 로그아웃 (클라이언트에서 토큰 삭제하므로 서버에서는 성공 응답만 반환)
  async logout() {
    return { message: "로그아웃되었습니다." };
  }

  // 회원 탈퇴
  async withdraw(userId) {
    if (!userId) {
      throw new ApiError(ErrorCodes.BAD_REQUEST, "사용자 ID가 필요합니다.");
    }

    const user = await this.model.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new ApiError(ErrorCodes.USER_NOT_FOUND);
    }

    // is_active를 false로 변경 (소프트 삭제)
    await this.model.update({
      where: { id: userId },
      data: { is_active: false },
    });

    return { message: "회원 탈퇴가 완료되었습니다." };
  }
}

module.exports = new AuthService();

