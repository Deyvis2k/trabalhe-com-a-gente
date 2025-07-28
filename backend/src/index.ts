import express from 'express';
import cors from 'cors';
import routes from './routes/github_route';

const app = express();

app.get('/', (req: any, res: any) => {
    res.json({
        message: 'Solução para o desafio da Notro'
    });
})

console.log('Solução para o desafio da Notro');
console.log("Listening on port http://127.0.0.1:3333");

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((req: any, res: any, next: any) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.listen(3333);
