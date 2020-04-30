const express = require('express');
const request = require('request');
const bodyParser = require("body-parser"); 
const ip = require('ip');

const app = express();
const port = process.env.PORT || 5000;
const c19_api_url = 'https://api.covid19api.com/summary';

app.set("view engine", "ejs"); 
app.set('views', __dirname + '/front');
app.use(bodyParser.urlencoded({ extended: false }));
app.use( express.static( "images" ) );

app.get('/', function(req, res) {
    try {
        request(c19_api_url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var info = JSON.parse(body);
                console.log(info['Global']);
                res.render('index', {infos:info});
            } else {
                res.render('down', {});
            }
        });
    } catch (e) {
        res.render('down', {});
    }
});

app.use(function(req, res) {
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Controller on at: http:/${ip.address()}:${port}`);
});