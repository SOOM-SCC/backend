// src/common/base.repository.js

class BaseRepository {
  constructor(model) {
    this.model = model; // 예: prisma.user
  }

  async findAll() {
    return this.model.findMany();
  }

  async findById(id) {
    return this.model.findUnique({
      where: { id: id },
    });
  }

  async create(data) {
    return this.model.create({
      data,
    });
  }

  async update(id, data) {
    return this.model.update({
      where: { id: id },
      data,
    });
  }

  async delete(id) {
    return this.model.delete({
      where: { id: id },
    });
  }
}

module.exports = BaseRepository;
