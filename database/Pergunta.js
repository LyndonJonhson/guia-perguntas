const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define('perguntas', { // Model Pergunta
    titulo:{
        type: Sequelize.STRING,
        allowNull: false // Não permitir espaço em branco
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false // Não permitir espaço em branco
    }
});

Pergunta.sync({force: false}).then(() => {}); // Sincronizando o model Pergunta com o BD

module.exports = Pergunta; // Exportando a conexão para utilizar em outros arquivos