const express = require('express');
const app = express();
const PORT = 3000;

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(PORT, () => {
  console.log('Server Running');
});
