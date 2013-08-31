// Feature: As a truck I want to receive events from the other trucks
//
// node rx_service.js port
//

var http = require("http");
var util = require('util');

var args = process.argv.splice(2)
var port = args[0]

function onRequest(request, response) {
  var body = '';
  var data = '';
  request.setEncoding('utf8');
  request.on('data', function (chunk) {
    body += chunk;
  })
  request.on('end', function () {
    try {
      var data = JSON.parse(body);
      console.log(util.inspect(data, { showHidden: false, depth: null }))
    } catch (er) {
      // uh oh!  bad json!
      response.statusCode = 400;
      return response.end('error: ' + er.message);
    }
  })

  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write('hello world ' + port);
  response.end();
}

function procData(mStream) {

}

http.createServer(onRequest).listen(port);