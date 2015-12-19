var qiniu = require('qiniu');
qiniu.conf.ACCESS_KEY = process.env.QINIU_ACCESS_KEY;
qiniu.conf.SECRET_KEY = process.env.QINIU_SECRET_KEY;
BUCKET_NAME = process.env.QINIU_BUCKET_NAME;

var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(morgan());
app.engine('jade', require('jade').__express);

app.get('/', function(req, res) {
    res.render('index.jade');
});

app.get('/uptoken', function(req, res) {
    var putPolicy = new qiniu.rs.PutPolicy(BUCKET_NAME);
    var token = putPolicy.token();
    res.json({
        token: token
    });
});

app.get('/:filename', function(req, res) {
    res.render('index.jade');
});
app.use('/', express.static(__dirname + "/public"));
app.use('/components', express.static(__dirname + "/components"));

var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('listening on port', port);
});

