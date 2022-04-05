const express = require('express');
const app = express();
const fetch = require('node-fetch');
const nodemailer = require('nodemailer');
const path = require('path');

const port = process.env.PORT || 2000; 
app.use(express.static('public'));
app.use(express.urlencoded());
app.listen(port, () => {
    console.log('listening port 2000');
})

app.use(express.json());
const BASE_URL = 'https://api.themoviedb.org/3/';
const KEY = 'api_key=5a259b2b1f9bd6265a9190156db203c4';
const DISCOVER_URL = 'discover/movie?';
const SEARCH_URL = 'search/movie?';
const FULL_URL_DISCOVER = BASE_URL + DISCOVER_URL + KEY;
const FULL_URL_SEARCH = BASE_URL + SEARCH_URL + KEY;

app.get('/movie', async (req, res) => {
    const fetch_resp = await fetch(FULL_URL_DISCOVER);
    const data = await fetch_resp.json();
    res.send(data);
})


app.post('/findmovie', async (req, res) => {
    console.log('got it');
    const request = req.body;
    console.log(request);
    const iquery = FULL_URL_SEARCH + '&query=' + request.textsearch;
    const response = await fetch(iquery);
    console.log(response);
    const data = await response.json();
    console.log(data);
    res.send(data);
})

app.post('/submit', async (req, res) => {
    const request = await req.body;
    console.log(request);
    const transporter =  await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'joaog151195@gmail.com',
            pass: 'dD35793605'
        }
    });

    const mailOptions = {
        from: req.body.email,
        to: 'joaog151195@gmail.com',
        subject: 'Sending Email using Node.js',
        text: `Nome: ${req.body.nome}
        Email: ${req.body.email}
        Mensagem: ${req.body.mensagem}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            alert("Enviado com sucesso !");
        }
    });

    res.redirect('/index.html')
})

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, './public', '/calculadora/calculadora.html'));
});