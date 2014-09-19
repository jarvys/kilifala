var Imagemin = require('imagemin');
var express = require('express');
var morgan = require('morgan');
var multer = require('multer');
var bodyParser = require('body-parser');
var app = express();

var BCS = require('baidu-bcs');
var bcs = BCS.createClient({
    accessKey: 'jgwhjG4fmRVvN7ZWScdeufAb',
    secretKey: '02eKCteLp8TynRsexATVDRZKS25NuiYI'
});

app.use(morgan());
app.use(bodyParser());
app.use(multer({
    dest: './uploads/'
}));
app.engine('jade', require('jade').__express);

app.get('/', function(req, res) {
    res.render('index.jade');
});

app.get('/:filename', function(req, res) {
    res.render('index.jade');
});

app.post('/upload/', function(req, res) {
    console.log(req.files);
    var file = req.files.file;
    if (!file || !file.name) {
        return res.redirect('/');
    }

    var filepath = 'uploads/' + file.name;
    new Imagemin().src(filepath).dest('uploads').run(function(err, files) {
        if (err) {
            console.error(err);
            return res.redirect('/');
        }

        console.log(file);
        bcs.putObject({
            bucket: 'kilifala',
            object: file.name,
            source: filepath,
        }, function(err, result) {
            if (err) {
                console.error(err);
                return res.redirect('/');
            }

            console.log(result);
            res.redirect('/' + req.files.file.name);
        });
    });
});

app.use('/', express.static(__dirname + "/public"));
app.use('/components', express.static(__dirname + "/components"));
app.use('/uploads', express.static(__dirname + "/uploads"));

PORT = 8574;
app.listen(PORT, function() {
    console.log('listening on port', PORT);
});
