const BaseController = require("../common/base.controller");
const evidenceService = require("../services/evidenceService");
const { success } = require("../common/apiResponse");

class EvidenceController extends BaseController {
    constructor() {
        super(evidenceService); // BaseService 기능 자동 상속
    }

    async upload(req, res, next) {
        try {
            const userId = req.user.id;

            const result = await this.service.uploadEvidence(
                userId,
                title,
                content,
                req.files
            );

            res.json(result);
        } catch (err) {
            next(err);
        }
    }

    async getDetail(req, res, next) {
        try {
            const id = req.params.id;
            const evidence = await this.service.getEvidenceById(id);
            res.json(evidence);
        } catch (err) {
            next(err);
        }
    }

    async getMyList(req, res, next) {
        try {
            const userId = req.user?.id;
            const list = await this.service.getMyEvidences(userId);
            res.json(list);
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const userId = req.user.id;
            const evidenceId = req.params.id;
            await this.service.softDeleteEvidence(userId, evidenceId);
            res.json(success("증거가 삭제되었습니다."));
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new EvidenceController();
