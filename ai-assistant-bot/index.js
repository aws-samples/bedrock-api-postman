require("dotenv").config();
var http = require("http");
var fs = require("fs");
var path = require("path");
const APP_PORT = process.env.APP_PORT || 3000;
const app = http.createServer(requestHandler);

app.listen(APP_PORT);
console.log(`🖥 HTTP Server running at ${APP_PORT}`);

function requestHandler(request, response) {
  var filePath = "./public" + request.url;
  if (filePath == "./public/") {
    filePath = "./public/index.html";
  }
  var extname = String(path.extname(filePath)).toLowerCase();
  var mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
  };
  var contentType = mimeTypes[extname] || "application/octet-stream";
  fs.readFile(filePath, function (error, content) {
    if (error) {
      if (error.code == "ENOENT") {
        fs.readFile("./public/404.html", function (error, content) {
          response.writeHead(404, { "Content-Type": contentType });
          response.end(content, "utf-8");
        });
      } else {
        response.writeHead(500);
        response.end("Sorry, there was an error: " + error.code + " ..\n");
      }
    } else {
      response.writeHead(200, { "Content-Type": contentType });
      response.end(content, "utf-8");
    }
  });
}

const io = require("socket.io")(app, {
  path: "/socket.io",
});

io.attach(app, {
  cors: {
    origin: "http://localhost",
    methods: ["GET", "POST"],
    credentials: true,
    transports: ["websocket", "polling"],
  },
  allowEIO3: true,
});
var AWS=require('aws-sdk');


var prompt={"prompt": "Human: You are an helpful assistant in a Airline frequently flying from EU to USA. Answer questions in a concise way.\n Assistant: ",
"max_tokens_to_sample":500
    };
const https = require('https');
const request = new AWS.HttpRequest("https://" + process.env.BEDROCK_ENDPOINT,process.env.AWS_REGION )
  const endpoint = process.env.BEDROCK_ENDPOINT

  request.method = 'POST'
  request.path = '/model/anthropic.claude-v2/invoke'
  request.headers.host = endpoint
  request.headers['Content-Type'] = 'application/json'

var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});

io.on("connection", (socket) => {
  
  socket.on("new-message", (data) => {
  
    console.log("new-message >>", data);
    prompt.prompt += " \n Human: " + data.message + " \n Assistant:";
    request.body=JSON.stringify(prompt);
    console.log(request.body);
    var signer = new AWS.Signers.V4(request, 'bedrock', true);
    signer.addAuthorization(credentials, AWS.util.date.getDate());
    
    var client = new AWS.HttpClient();
     client.handleRequest(request, null, function(response) {
      console.log(response.statusCode + ' ' + response.statusMessage);
      var responseBody = '';
      response.on('data', function (chunk) {
       responseBody += chunk;
      });
      response.on('end', function (chunk) {
       var res= JSON.parse( responseBody);
       console.log(res);
       prompt.prompt +=res.completion;
        socket.emit("response-message", res.completion);
      
      });
     }, function(error) {
      console.log('Error: ' + error);
     });
 
    
  });
});
