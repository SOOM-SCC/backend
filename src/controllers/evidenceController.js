const BaseController = require("../common/base.controller");
const evidenceService = require("../services/evidenceService");
const { success } = require("../common/apiResponse");

class EvidenceController extends BaseController {
    constructor() {
        super(evidenceService); // BaseService 기능 자동 상속
    }

    upload = async (req, res, next) => {
        try {
            const userId = req.user.id;
            const { title, content } = req.body;

            const result = await this.service.uploadEvidence(
                userId,
                title,
                content,
                req.files
            );

            return success(res, result, "증거 업로드 완료", 201);
        } catch (err) {
            next(err);
        }
    };

    getDetail = async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const evidence = await this.service.getEvidenceById(id);
            return success(res, evidence, "증거 상세 조회 완료");
        } catch (err) {
            next(err);
        }
    };

    getMyList = async (req, res, next) => {
        try {
            const userId = req.user?.id;
            const list = await this.service.getMyEvidences(userId);
            return success(res, list, "내 증거들 조회 완료");
        } catch (err) {
            next(err);
        }
    };

    delete = async (req, res, next) => {
        try {
            const userId = req.user.id;
            const evidenceId = parseInt(req.params.id);
            await this.service.softDeleteEvidence(userId, evidenceId);
            success(res, null, "증거가 삭제되었습니다.");
        } catch (err) {
            next(err);
        }
    };
}

module.exports = new EvidenceController();
