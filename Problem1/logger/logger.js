const winston = require('winston');
const express = require("express")
const expressWinston = require("express-winston")
require('winston-mongodb')
const app = express()


app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
        level:"info",
        json: true
    }),
     new winston.transports.MongoDB({
        level: "info",
        db:"mongodb://127.0.0.1:27017/weatherapi"
     })
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),

}));


