const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");
// Database
connection 
    .authenticate() // Conexão com o BD
    .then(() => {
        console.log("Conexão feita com o banco de dados!");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

// Estou dizendo para o Express usar o EJS como view engine
app.set("view engine", "ejs");
// Para pode utilizar arquivos estáticos como img, css...
app.use(express.static('public'));
// Body parser para capturar os dados enviados do formulário
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Rotas
app.get("/", (req, res) => {
    Pergunta.findAll({
        raw: true /* Retornar apenas dados */,
        order:[
            ['id', 'DESC'] //ASC - Crescente || DESC - Decrescente
        ]
    }).then(perguntas => { // Adquirindo os dados da tabela
        res.render("index", { // Renderizando a página inicial
            perguntas: perguntas // e levando ao frontend os dados da tabela
        });
    });    
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
    // Capturando os dados do formulário
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Pergunta.create({ // Salvando os dados do formulário no model Pergunta
        titulo: titulo,
        descricao: descricao
    }).then(() => { // Caso aconteça com sucesso
        res.redirect("/");  // Redirecionar usuário à página inicial
    })
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ // Pergunta encontrada
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [
                    ['id', 'DESC']
                ]
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });            
        }else{ // Pergunta não encontrada
            res.redirect("/");
        }
    });
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);
    });
});

// Servidor
app.listen(8080, () => {console.log("App rodando!");});