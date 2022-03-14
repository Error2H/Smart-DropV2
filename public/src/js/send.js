const Vonage = require('@vonage/server-sdk');
const http = require('http')
const fs = require('fs')
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/html' })
    fs.createReadStream('success.html').pipe(res)
  })
  
  server.listen(process.env.PORT || 3000)

const vonage = new Vonage({
  apiKey: "fc08ac25",
  apiSecret: "Qyk8afSO8z023qLY"
});

  const from = "Smart Drop";
  const to = "66" + localStorage.getItem("phoneNumber");
  const text = 'พัสดุของท่านได้รับการฝากไว้แล้ว';


  vonage.message.sendSms(from, to, text, (err, responseData) => {
      if (err) {
          console.log(err);
      } else {
          if(responseData.messages[0]['status'] == "0") {
              console.log("Message sent successfully.");
              window.location.href = './index.html';
          } else {
              console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
          }
      }
  })

  