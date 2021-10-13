const express = require('express')
const amqp = require("amqplib/callback_api");
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'hello';

    channel.assertQueue(queue, {
      durable: false
    });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    channel.consume(queue, function(msg) {
        console.log(msg, 'MSG');
        console.log(" [x] Received %s", JSON.parse(msg.content));
    }, {
        noAck: true
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})