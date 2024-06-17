const express = require('express');
const serverStatic = require('serve-static');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
app.use(serverStatic(__dirname))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const port = process.env.APPLICATION_PORT;
const fullDomain = process.env.ENDPOINT.concat(':').concat(process.env.APPLICATION_PORT);

app.listen(port, () => {
    console.log("Application started at: " + fullDomain);
});

app.get('/', function(req, res) {
    res.sendFile('src/index.html', { root: __dirname });
});
