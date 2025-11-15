const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 즐겨찾기 라우트
const favoriteRoute = require("./src/routes/favoriteRoute");
app.use("/favorites", favoriteRoute);

// routes
// app.get("/", (req, res) => {
//     res.send("Hello, Node.js server!");
// });

// handlers
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
