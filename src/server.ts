import express, {Request,Response,Application} from 'express';

const app: Application = express();
const PORT = 8080;

app.get("/", (req: Request, res: Response): void => {
    res.send("Hello Node.js coming at you with Typescript!")
});

app.listen(PORT, (): void => {
    console.log(`Server running on port ${PORT}/`)
})