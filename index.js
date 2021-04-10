const express = require("express");
const logger = require("./logging");
const xmlparser = require("express-xml-bodyparser");
const app = express();

app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xmlparser());

app.use((req, res, next) => {
  logger.debug("--------------------------------------");
  logger.debug("Request Protocal:", req.protocol);
  logger.debug("Request Url:", req.url);
  logger.debug("Request Query:", req.query);
  logger.debug("Request Headers:", req.headers);
  next();
});

app.get("/*", (req, res) => {
  res.json({
    protocol: req.protocol,
    path: req.path,
    url: req.url,
    query: req.query,
  });
});

function getBody(req) {
  let body;
  if (req.is("*/xml")) {
    body = req.rawBody;
  } else {
    body = req.body;
  }
  return body;
}

app.post("/echobody", (req, res) => {
  let body = getBody(req);
  logger.debug("Request Body:", body);
  res.send(body);
});

app.post("/*", (req, res) => {
  res.json({
    protocol: req.protocol,
    path: req.path,
    url: req.url,
    query: req.query,
    body: req.body,
  });
});

app.listen(8000, () => {
  logger.info("Http echo app started at port:", 8000);
});
