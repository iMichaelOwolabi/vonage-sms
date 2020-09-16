const express = require('express');
const Nexmo = require('nexmo');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_KEY,
  apiSecret: process.env.NEXMO_SECRET,
});

app.post('/nexmo/sms', (req, res) => {
  const { sender, recipient, message } = req.body;

  nexmo.message.sendSms(sender, recipient, message);

  res.status(200).send({
    status: true,
    message: 'message sent',
  })
})

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
