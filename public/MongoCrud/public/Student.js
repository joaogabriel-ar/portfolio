const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const studentSchema = new Schema({
    nome: String,
    idade: Number,
    nota1: Number,
    nota2: Number,
    nota3: Number,
    nota4: Number,
    situacao: String
})

module.exports = mongoose.model("Student", studentSchema);