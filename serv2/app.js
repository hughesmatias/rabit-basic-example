const express = require("express");
const amqp = require("amqplib/callback_api");
const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/send_message", (req, res) => {
  amqp.connect("amqp://localhost", function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      var queue = "hello";
      var msg = {
        id: Math.random().toString(),
        message: "Hello world"
      };

      channel.assertQueue(queue);

      channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
      console.log(" [x] Sent %s", msg);
      res.end();
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
