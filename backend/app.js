const express = require('express');
const cors = require('cors');
const db = require('./models');

const app = express();
const port = 5000;

app.use(cors({
  origin: '*',
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    data: 'Hello World!'
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
