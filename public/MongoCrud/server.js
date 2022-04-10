const mongoose = require('mongoose');
const Student = require("./public/Student.js");
const express = require('express');
const connectToDataBase = require("./connection.js");

const app = express();
const port = 3000;
app.use(express.json());

app.use(express.static('public'));
app.use(express.urlencoded());

app.listen(port, () => {
    console.log("Listening port 3000")
});

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