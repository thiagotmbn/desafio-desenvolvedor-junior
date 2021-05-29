const Sequelize = require("sequelize");

    //CONEXÃO DATABASE
    const sequelize = new Sequelize("projetoTeste","root","20010906",{
        host: "localhost", 
        dialect: "mysql"
        });

        module.exports = {
            Sequelize: Sequelize,
            sequelize: sequelize
        };

