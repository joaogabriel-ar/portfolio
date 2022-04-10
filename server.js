const express = require('express');
const app = express();
const fetch = require('node-fetch');
const nodemailer = require('nodemailer');
const path = require('path');
const connectToDataBase = require("./public/MongoCrud/public/connection.js");
const mongoose = require('mongoose');
const Student = require("./public/MongoCrud/public/Student.js");
const port = process.env.MONGODB_URI || process.env.PORT
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


function situacao(nota1, nota2, nota3, nota4) {

    let resultado = '';
    console.log(nota1);
    if (nota1 == 0 && nota2 == 0 && nota3 == 0 && nota4 == 0) {
        resultado = "Indefinido";

    }
    else {
        let situacao = (Number(nota1) + Number(nota2) + Number(nota3) + Number(nota4)) / 4;
        if (situacao >= 6) {
            resultado = "Aprovado";
        } else if (situacao < 6) {
            resultado = "Recuperação";
        }
    }


    return resultado
}

app.post('/form', async (req, resp) => {
    connectToDataBase();
    const data = req.body;
    let nota1 = req.body.nota1
    let nota2 = req.body.nota2
    let nota3 = req.body.nota3
    let nota4 = req.body.nota4

    const student = await Student.create({
        nome: req.body.nome,
        idade: req.body.idade,
        nota1: req.body.nota1,
        nota2: req.body.nota2,
        nota3: req.body.nota3,
        nota4: req.body.nota4,
        situacao: situacao(nota1, nota2, nota3, nota4)
    });

    console.log(student);
    resp.redirect('back');
})

app.get('/findStudent', async (req, resp) => {
    console.log('entrei');
    connectToDataBase();
    const findStudent = await Student.find({});
    resp.send(findStudent);
})

app.post('/remove', async (req, resp) => {
    connectToDataBase();
    const studentID = req.body.trId;
    console.log(studentID);
    const removeStudent = await Student.deleteOne({
        _id: studentID
    });
    console.log(removeStudent);
    resp.send("Excluído");
})
app.post('/editStudent', async (req, resp) => {
    connectToDataBase();
    const studentID = req.body.trId;
    const findStudent = await Student.findById({
        _id: studentID
    });
    resp.setHeader('Content-Type', 'application/json');
    resp.json(findStudent);

})
app.post('/updateForm', async (req, resp) => {
    connectToDataBase();
    let nota1 = req.body.nota1
    let nota2 = req.body.nota2
    let nota3 = req.body.nota3
    let nota4 = req.body.nota4
    req.body.situacao = situacao(nota1, nota2, nota3, nota4);
    const data = req.body;
    console.log(data);
    const findStudent = await Student.findById(req.body.id);
    const updateStudent = await Student.findByIdAndUpdate(findStudent, data);
    resp.redirect('back');
})