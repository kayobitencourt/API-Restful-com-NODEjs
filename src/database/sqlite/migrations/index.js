const sqliteConnection = require("../../sqlite");//Conectando ao banco de dados

const createUsers = require("./createUsers");//Importando o usercontrollers

async function migrationsRun() {
  const schemas = [createUsers].join('');

  sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(erro => console.error(erro));
}

module.exports = migrationsRun;
