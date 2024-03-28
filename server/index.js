const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const router = require("./router");
const cors = require("cors");
const {requestLogger, requestError} = require("./utils");
const mysql2 = require("mysql2/promise");
const config = require("./db/config.json");
const http = require('http');

dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

global.mysql = mysql2.createPool(config);

app
  .use(cors())
  .use(requestLogger)
  .use(express.json())
  .use(bodyParser.json())
  .use('/api', router)
  .use(requestError);

server.listen(port, 'localhost',() => {
  console.log(`Server is running at http://localhost:${port}`);
});