// src/common/base.service.js
const ApiError = require("./apiError");
const ErrorCodes = require("./errorCodes");

class BaseService {
  constructor(model) {
    this.model = model; // Prisma 모델 예: prisma.user
  }

  getAll() {
    return this.model.findMany();
  }

  async getById(id) {
    const data = await this.model.findUnique({
      where: { id: Number(id) },
    });

    if (!data) throw new ApiError(ErrorCodes.NOT_FOUND);
    return data;
  }

  create(dto) {
    return this.model.create({ data: dto });
  }

  async update(id, dto) {
    try {
      return await this.model.update({
        where: { id: Number(id) },
        data: dto,
      });
    } catch (e) {
      throw new ApiError(ErrorCodes.NOT_FOUND);
    }
  }

  async delete(id) {
    try {
      return await this.model.delete({
        where: { id: Number(id) },
      });
    } catch (e) {
      throw new ApiError(ErrorCodes.NOT_FOUND);
    }
  }
}

module.exports = BaseService;
