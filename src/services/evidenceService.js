const BaseService = require("../common/base.service");
const prisma = require("../utils/prisma");
const ApiError = require("../common/apiError");
const ErrorCodes = require("../constants/errorCodes");
const path = require("path");

class EvidenceService extends BaseService {
    constructor() {
        super(prisma.evidences);
    }

    // 🫧 evidence 업로드
    async uploadEvidence(userId, title, content, files) {
        // 유효성 검사 및 파일 첨부 확인
        if (!userId || !title || !content) {
            throw new ApiError(ErrorCodes.BAD_REQUEST, "필수 정보 누락");
        }
        if (!files || files.length === 0) {
            throw new ApiError(
                ErrorCodes.BAD_REQUEST,
                "최소 1개의 파일이 필요합니다."
            );
        }

        // 1. evidence 생성
        const evidence = await prisma.evidences.create({
            data: {
                user_id: userId,
                title,
                content,
            },
        });

        // 2. 파일 정보 evidence_files에 저장
        const fileRecords = await Promise.all(
            files.map((file) =>
                prisma.evidence_files.create({
                    data: {
                        evidence_id: evidence.id,
                        file_url: `/uploads/evidences/${file.filename}`,
                        mime_type: file.mimetype,
                        size_bytes: file.size,
                        original_filename: file.originalname,
                    },
                })
            )
        );

        return {
            ...evidence,
            evidenceFiles: fileRecords,
        };
    }

    // 🫧 특정 증거 상세 조회
    async getEvidenceById(id) {
        // 파일도 끌어와서 조회
        const evidence = await prisma.evidences.findUnique({
            where: { id, is_deleted: false },
            include: {
                evidenceFiles: true,
            },
        });

        if (!evidence) {
            throw new ApiError(
                ErrorCodes.NOT_FOUND,
                "증거를 찾을 수 없습니다."
            );
        }

        return evidence;
    }

    // 🫧 내가 올린 증거들 전체 조회 (동적 조회 가능)
    async getMyEvidences(userId, orderBy) {
        return prisma.evidences.findMany({
            where: {
                user_id: userId,
                is_deleted: false,
            },
            orderBy,
            include: {
                evidenceFiles: {
                    orderBy: { created_at: "asc" }, // 가장 먼저 업로드된 파일
                    take: 1, // 대표 파일 1개 가져오기 (미리보기용)
                },
            },
        });
    }

    // 🫧 증거 삭제
    async softDeleteEvidence(userId, evidenceId) {
        // 1. 본인 소유 확인
        const evidence = await prisma.evidences.findFirst({
            where: { id: evidenceId, user_id: userId, is_deleted: false },
        });

        if (!evidence) {
            throw new ApiError(ErrorCodes.NOT_FOUND, "삭제할 증거가 없습니다.");
        }

        const now = new Date();

        // 2. evidence soft delete
        await prisma.evidences.update({
            where: { id: evidenceId },
            data: {
                is_deleted: true,
                deleted_at: now,
            },
        });

        // 3. evidence_files soft delete
        await prisma.evidence_files.updateMany({
            where: { evidence_id: evidenceId },
            data: {
                is_deleted: true,
                deleted_at: now,
            },
        });

        return { success: true };
    }
}

module.exports = EvidenceService;
