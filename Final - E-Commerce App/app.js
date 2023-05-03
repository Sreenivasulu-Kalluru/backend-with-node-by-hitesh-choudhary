const express = require('express');
require('dotenv').config();
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// * for swagger documentation
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yamljs');
const fileUpload = require('express-fileupload');

const file = fs.readFileSync('./swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// * regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * cookies and file middleware
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);

// * temp check
app.set('view engine', 'ejs');

// * morgon middleware
app.use(morgan('tiny'));

// * import all routes here
const home = require('./routes/home');
const user = require('./routes/user');
const product = require('./routes/product');
const payment = require('./routes/payment');
const order = require('./routes/order');

// * router middleware
app.use('/api/v1', home);
app.use('/api/v1', user);
app.use('/api/v1', product);
app.use('/api/v1', payment);
app.use('/api/v1', order);

app.get('/signuptest', (req, res) => {
  res.render('signuptest');
});

// * export app js
module.exports = app;
