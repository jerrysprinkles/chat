const path = require("path");
const fs = require("fs");
const http = require("http").createServer((req, res) => {
  res.write(fs.readFileSync("src/pages/index.html"));
});

const ws = require("ws");

const wss = new ws.Server({ server: http });

wss.on("connection", function connection(ws) {
  ws.on("message", function message(data) {
    wss.clients.forEach(function each(client) {
      client.send(Buffer.from(data).toString());
    });
  });
});

http.listen(process.env.PORT);
