const Sequelize = require("sequelize");

const connection = new Sequelize('guiaperguntas', 'root', '020896130597', { // Conectando ao mysql
    host: 'localhost', // Qual servidor se conectar
    dialect: 'mysql' // Qual tipo de banco de dados se conectar
});

module.exports = connection; // Exportando a conexão para utilizar em outros arquivos