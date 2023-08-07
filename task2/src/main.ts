import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import {
  checkAndCreateTable,
  putItem,
  getItem,
  getByUrl,
  scanTable
} from './data-access.js';

await checkAndCreateTable();

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 3000;
app.use(express.json());


app.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const data = await scanTable();
    res.status(200).send(data.Items);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

app.get('/:url', async (req: Request, res: Response): Promise<void> => {
  const url = req.params.url;

  try {
    const data = await getByUrl(url);
    if (data.Items) {
      res.status(200).send(data.Items.map((item) => item.Data.S));
    } else {
      res.status(404).send('Not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

app.get('/:url/:dateCrawled', async (req: Request, res: Response): Promise<void> => {
  const url = req.params.url;
  const dateCrawled = req.params.dateCrawled;

  try {
    const data = await getItem(url, dateCrawled);
    if (data.Item) {
      res.status(200).send(data.Item.Data.S);
    } else {
      res.status(404).send('Not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});


app.post('/', async (req: Request, res: Response): Promise<void> => {
  const payload = req.body;
  if (!payload.url || !payload.data) {
    res.status(400).send('Missing data');
    return;
  }
  try {
    await putItem(payload.url, new Date().toISOString().slice(0, 10), payload.data);
    res.status(200).send('OK');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});


app.listen(PORT, (): void => {
  console.log(`Server running on port ${PORT}`);
});
