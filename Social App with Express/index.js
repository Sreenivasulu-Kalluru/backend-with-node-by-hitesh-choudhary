const express = require('express');
const format = require('date-format');
const app = express();

const PORT = 4000 || process.env.PORT;

app.get('/', (req, res) => {
  res.status(201).send('<h1>Hello from Vasu</h1>');
});

app.get('/api/v1/instagram', (req, res) => {
  const instaSocial = {
    username: 'Vasu',
    followers: 166,
    follows: 69,
    date: format.asString('dd[MM] - hh:mm:ss', new Date()),
  };

  res.status(200).json(instaSocial);
});

app.get('/api/v1/facebook', (req, res) => {
  const facebookSocial = {
    username: 'Vasu Kalluru',
    followers: 3124,
    follows: 3124,
    date: format.asString('dd[MM] - hh:mm:ss', new Date()),
  };

  res.status(200).json(facebookSocial);
});

app.get('/api/v1/linkedin', (req, res) => {
  const linkedInSocial = {
    username: 'Vasu K',
    followers: 2400,
    follows: 2,
    date: format.asString('dd[MM] - hh:mm:ss', new Date()),
  };

  res.status(200).json(linkedInSocial);
});

app.get('/api/v1/:token', (req, res) => {
  console.log(req.params.token);
  res.status(200).json({ param: req.params.token });
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
