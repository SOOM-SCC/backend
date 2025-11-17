const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 즐겨찾기 라우트
const favoriteRoute = require("./src/routes/favoriteRoute");
app.use("/favorites", favoriteRoute);

// 내 관련 라우트
const meRoute = require("./src/routes/meRoute");
app.use("/me", meRoute);

// 에러 핸들러 미들웨어
const { errorHandler, notFoundHandler } = require("./src/middlewares/errorHandler");
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
