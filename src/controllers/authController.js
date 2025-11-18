const BaseController = require("../common/base.controller");
const authService = require("../services/authService");
const { success } = require("../common/apiResponse");

class AuthController extends BaseController {
  constructor() {
    super(authService);
  }

  // 회원가입
  signup = async (req, res, next) => {
    try {
      const { email, password, name } = req.body;

      const data = await this.service.signup(email, password, name);

      return success(res, data, "회원가입이 완료되었습니다.", 201);
    } catch (err) {
      next(err);
    }
  };

  // 로그인
  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const data = await this.service.login(email, password);

      return success(res, data, "로그인 성공");
    } catch (err) {
      next(err);
    }
  };

  // 로그아웃
  logout = async (req, res, next) => {
    try {
      const data = await this.service.logout();

      return success(res, data, "로그아웃 성공");
    } catch (err) {
      next(err);
    }
  };

  // 회원 탈퇴
  withdraw = async (req, res, next) => {
    try {
      const userId = req.user.id;

      const data = await this.service.withdraw(userId);

      return success(res, data, "회원 탈퇴가 완료되었습니다.");
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new AuthController();

