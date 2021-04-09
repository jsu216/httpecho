const express = require("express");
var xmlparser = require('express-xml-bodyparser');

const app = express();

app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xmlparser());

app.get("/*", (req, res) => {
  res.json({
    protocol: req.protocol,
    path: req.path,
    url: req.url,
    query: req.query,
  });
});

function getBody (req) {
  var body;
  if (req.is('*/xml')) {
    body = req.rawBody;
  } else {
    body = req.body;
  }
  return body;
}

app.post("/echobody", (req, res) => {
  var contype = req.headers['content-type'];
  console.log("Content-type:", contype);
  // console.log("Raw req:", req);
  res.send(getBody(req));
  res.end();
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
  console.log("Http echo app listening on port 8000!");
});
