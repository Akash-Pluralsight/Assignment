import express, {  Request, Response , Application } from 'express';
import myRoutes from './routes/routes';
const app: Application = express();
const port = 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
  console.log(`Server is Live at http://localhost:${port}`);
});

app.use(express.json());

app.use('/api', myRoutes);