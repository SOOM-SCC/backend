const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 인증 라우트
const authRoute = require("./src/routes/authRoute");
app.use("/auth", authRoute);

// 즐겨찾기 라우트
const favoriteRoute = require("./src/routes/favoriteRoute");
app.use("/favorites", favoriteRoute);

// routes
// app.get("/", (req, res) => {
//     res.send("Hello, Node.js server!");
// });

// handlers
const notFoundHandler = require("./src/middlewares/notFoundHandler");
const errorHandler = require("./src/middlewares/errorHandler");

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
