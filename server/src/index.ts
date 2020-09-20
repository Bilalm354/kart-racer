import express from 'express';

const app = express();
const port = 8080;

app.get('/', (_req, res) => {
  res.send('Hello Mate!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started at http://localhost:${port}`);
});
