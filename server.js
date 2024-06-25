const express = require('express');
const serveStatic = require('serve-static');

const app = express();
const port = process.env["PORT"] || "3000";

app.use(serveStatic("./dist/imagenet-classifier-frontend/browser"));

app.get("*", (req, res) => {
    res.sendFile('./index.html', { root: "./dist/imagenet-classifier-frontend/browser" });
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});