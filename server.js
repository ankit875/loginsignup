const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./server/routes/user');

const PORT =  process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json({extended: false}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.get('/ping', (req, res) => res.status(200).json({message: "API server is up and runnning"}));

app.use('/user',userRouter);

app.listen(PORT, () => console.log(`API server is running at port ${PORT}`));