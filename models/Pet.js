const db = require("./db");

const Pet = db.sequelize.define("pets", {
    dono: {
        type: db.Sequelize.STRING
    },
    numero: {
        type: db.Sequelize.INTEGER
    },
    tipo: {
        type: db.Sequelize.STRING
    },
    raca: {
        type: db.Sequelize.STRING
    },
    cor: {
        type: db.Sequelize.STRING
    },
    idade: {
        type: db.Sequelize.INTEGER
    }

});

Pet.sync({ force: true });
module.exports = Pet;