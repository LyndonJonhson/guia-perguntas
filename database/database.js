const Sequelize = require("sequelize");

const connection = new Sequelize('heroku_b6cf1402dc3974e', 'ba684cee3164d1', 'bcbe65b9', { // Conectando ao mysql
    host: 'us-cdbr-east-05.cleardb.net', // Qual servidor se conectar
    dialect: 'mysql' // Qual tipo de banco de dados se conectar
});

module.exports = connection; // Exportando a conexão para utilizar em outros arquivos