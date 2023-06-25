var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors')
var fs = require('fs');
const { makeDirectoryByPathSync } = require('./make_directory_recursive');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors(
    {
        origin: '*'
    }
))

app.get('/', function (req, res) {
    res.status(200).json({ message: "eVidencija Server" });
});

// Export attendances 
app.post('/export', function (req, res) {
    console.log(req.body);

    makeDirectoryByPathSync('documents');

    var stream = fs.createWriteStream(`./documents/${req.body["fileName"]}.csv`, { flags: 'w' });
    stream.write(req.body["content"].toString());
    stream.end();

    res.status(200).json({ message: "Export Success" });
});


// to forward with ngrok, use ngrok http 3001
// set port
app.listen(3001, function () {
    console.log('eVidencija Server is running on port 3001');
});
module.exports = app;