import express from 'express';
const app = express();
const PORT = 8080;
app.get("/", (req, res) => {
    res.send("Hello Node.js coming at you with Typescript!");
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}/`);
});
//# sourceMappingURL=server.js.map