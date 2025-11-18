const BaseService = require("../common/base.service");
const prisma = require("../utils/prisma");
const ApiError = require("../common/apiError");
const ErrorCodes = require("../constants/errorCodes");

class FavoriteService extends BaseService {
    constructor() {
        super(prisma.favorites); // Prisma favorites 모델 주입
    }

    // 1. 즐겨찾기 추가
    async addFavorite(userId, shelterId, shelterName) {
        if (!userId || !shelterId || !shelterName) {
            throw new ApiError(
                ErrorCodes.BAD_REQUEST,
                "필수 정보가 누락되었습니다."
            );
        }

        return this.model.create({
            data: {
                user_id: userId,
                shelter_id: shelterId,
                shelter_name: shelterName,
            },
        });
    }

    // 2. 즐겨찾기 삭제
    async deleteFavorite(userId, favoriteId) {
        if (!userId || !favoriteId) {
            throw new ApiError(
                ErrorCodes.BAD_REQUEST,
                "필수 정보가 누락되었습니다."
            );
        }

        const favorite = await this.model.findFirst({
            where: {
                user_id: userId,
                id: favoriteId,
            },
        });

        if (!favorite) throw new ApiError(ErrorCodes.NOT_FOUND);

        return this.model.delete({
            where: { id: favorite.id },
        });
    }

    // 3. 즐겨찾기 조회
    async getMyFavorites(userId) {
        if (!userId) {
            throw new ApiError(
                ErrorCodes.BAD_REQUEST,
                "필수 정보가 누락되었습니다."
            );
        }

        return this.model.findMany({
            where: { user_id: userId },
            orderBy: { created_at: "desc" },
        });
    }
}

module.exports = new FavoriteService();
