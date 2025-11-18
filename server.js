const express = require("express");
const { swaggerUi, specs } = require("./swagger/swagger");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

// 인증 라우트
const authRoute = require("./src/routes/authRoute");
app.use("/auth", authRoute);

// 즐겨찾기 라우트
const favoriteRoute = require("./src/routes/favoriteRoute");
app.use("/favorites", favoriteRoute);

// 내 관련 라우트
const meRoute = require("./src/routes/meRoute");
app.use("/me", meRoute);

// 증거 라우트
const evidenceRoute = require("./src/routes/evidenceRoute");
app.use("/evidences", evidenceRoute);

// 에러 핸들러 미들웨어
const notFoundHandler = require("./src/middlewares/notFoundHandler");
const errorHandler = require("./src/middlewares/errorHandler");
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
