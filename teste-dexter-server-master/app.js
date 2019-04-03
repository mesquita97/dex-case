var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
const bodyParser = require('body-parser');



const LOCAL_URL="http://localhost:1337/parse";

var api = new ParseServer({
  databaseURI: databaseUri || "mongodb://dex.company:DEX.Company70@ds135252.mlab.com:35252/teste-dexter",
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'OSGiFZBrXxNLjN3gYDPsgi7P4a0j6fzcc2iaCKga',
  masterKey: process.env.MASTER_KEY || 'k8xm42UVuIP51wR2DswLY8NL3zgWfev8AuKUUjga',
  serverURL: process.env.SERVER_URL || 'https://dex-case.herokuapp.com/parse'
});

var dashboard = new ParseDashboard({
	apps: [{
		serverURL: LOCAL_URL,
		appId: 'OSGiFZBrXxNLjN3gYDPsgi7P4a0j6fzcc2iaCKga',
		masterKey: 'k8xm42UVuIP51wR2DswLY8NL3zgWfev8AuKUUjga',
		appName: "Teste Dexter" 
	}],
	users: [{
		user:"admin",
		pass:"newPassword"
	}]
});

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/dashboard', dashboard);
app.use(express.static('imgs')); //

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.get('/parse', function(req, res) {
  res.sendFile(res.body);
});

app.post('/parse', function(req, res){
  
  var user = req.body.email;
  var password = req.body.password;
  var login = [user, password];
  res.sendDate('http://localhost:1337/parse');
});

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);
var port = 1337;


app.listen(port, function() {
    console.log('Teste Dexter API running on port ' + port + '.');
});
