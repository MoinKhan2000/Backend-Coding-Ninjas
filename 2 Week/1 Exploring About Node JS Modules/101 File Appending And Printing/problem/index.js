// Please do not change the prewritten code

import http from "http";
import fs from "fs";
const server = http.createServer((req, res) => {
  let body = ""
  if (req.method === 'POST') {
    req.on('data', (data) => {
      body += data.toString();
    })
    req.on('end', () => {
      fs.appendFileSync('data.txt', body)
    })
    const newData = fs.readFileSync('data.txt', 'utf8');
    console.log(newData);
    return res.end("Data received");
  }
  else {
    res.end("Method Not Allowed");
  }
});
server.listen(3000)
export default server;
