// src/common/base.service.js
const ApiError = require("./apiError");
const ErrorCodes = require("./errorCodes");

class BaseService {
  constructor(model) {
    this.model = model; // Prisma 모델 (ex: prisma.user)
  }

  // 전체 조회
  getAll() {
    return this.model.findMany();
  }

  // 단일 조회
  async getById(id) {
    const data = await this.model.findUnique({
      where: { id: id },
    });

    if (!data) {
      throw new ApiError(ErrorCodes.NOT_FOUND);
    }

    return data;
  }

  // 생성
  create(dto) {
    return this.model.create({
      data: dto,
    });
  }

  // 수정
  async update(id, dto) {
    try {
      return await this.model.update({
        where: { id: id },
        data: dto,
      });
    } catch (e) {
      throw new ApiError(ErrorCodes.NOT_FOUND);
    }
  }

  // 삭제
  async delete(id) {
    try {
      return await this.model.delete({
        where: { id: id },
      });
    } catch (e) {
      throw new ApiError(ErrorCodes.NOT_FOUND);
    }
  }
}

module.exports = BaseService;
