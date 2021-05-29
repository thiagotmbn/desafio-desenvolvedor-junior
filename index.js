const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const Pet = require("./models/Pet");
const path = require("path");
var x;

///config
//Template engine
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// public
app.use(express.static('public'));
app.use(express.static('layouts'));
//Body Parser    
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


///Rotas
//Call Front-End
app.get("/", function(req, res) {
    Pet.findAll().then(function(pets) {
        res.render("home", { pets: pets, style: "styleTable.css" });
    });
});

//Formulario
app.get("/cad", function(req, res) {

    res.render("formulario", { act: "add", style: "style.css", att: "Cadastro" });

});

//Formulario_Editar
app.get("/update", function(req, res) {

    res.render("formulario", { act: "editar", style: "style.css", att: "Atualização" });

});

//ROTA ALTERNATIVA
app.get("/alt/:id", function(req, res) {
    x = req.params.id;
    res.redirect("/update");
})

//Criar
app.post("/add", function(req, res) {

    Pet.create({
        dono: req.body.dono,
        numero: req.body.numero,
        tipo: req.body.tipo,
        raca: req.body.raca,
        cor: req.body.cor,
        idade: req.body.idade
    }).then(function() {
        res.redirect("/");
    }).catch(function(erro) {
        res.send("Cadastro não realizado! log a seguir: " + erro);
    });
});

//Editar
app.post("/editar", function(req, res) {

    Pet.update({
        dono: req.body.dono,
        numero: req.body.numero,
        tipo: req.body.tipo,
        raca: req.body.raca,
        cor: req.body.cor,
        idade: req.body.idade
    }, { where: { id: x } }).then(function() {
        res.redirect("/");
    }).catch(function(erro) {
        res.send("Cadastro não atualizado! log a seguir: " + erro);
    });
});

//deletar
app.get("/deletar/:id", function(req, res) {
    Pet.destroy({ where: { "id": req.params.id } }).then(function() {
        res.redirect("/");
    });
});

//Server
app.listen(8081, function(req, res) {
    console.log("Status server = OK!");
});