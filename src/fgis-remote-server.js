var PORT = 33333;
var GROUP = '224.0.0.114';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

/*server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' - ' + message);

});
*/

server.on('close', function() {
	console.log('closing tx server');
});

server.on('error', function() {
	console.log('error tx server');
});

server.bind(PORT, function() {
	server.addMembership(GROUP);
});

var message = new Buffer('My FGIS is RHoK!');

server.send(message, 0, message.length, PORT, GROUP, function(err, bytes) {
	if (err) throw err;
    console.log('UDP message sent to ' + GROUP +':'+ PORT);
  	server.close();
})