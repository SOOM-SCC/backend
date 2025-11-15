const BaseController = require("../common/base.controller");
const favoriteService = require("../services/favoriteService");
const { success } = require("../common/apiResponse");

class FavoriteController extends BaseController {
  constructor() {
    super(favoriteService); // BaseService 기능 자동 상속
  }

  // JWT 기반 — req.user.id 사용
  addFavorite = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { shelterId, shelterName } = req.body;

      const data = await this.service.addFavorite(
        userId,
        shelterId,
        shelterName
      );

      return success(res, data, "즐겨찾기 추가 완료", 201);
    } catch (err) {
      next(err);
    }
  };

  deleteFavorite = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const favoriteId = req.params.favoriteId;

      await this.service.deleteFavorite(userId, favoriteId);

      return success(res, null, "즐겨찾기 삭제 완료");
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new FavoriteController();