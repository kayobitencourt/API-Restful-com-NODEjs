const { hash, compare } = require("bcryptjs");//Criptografando a senha

const AppError = require("../utils/AppError");//Criando um erro
const sqliteConnection = require("../database/sqlite");//Conectando ao banco de dados


class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;//Recebendo os dados do formulario

    const database = await sqliteConnection();//Conectando ao banco de dados
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);//Verificando se o email já existe

    if(checkUserExists){
      throw new AppError("email already exists");//Se o email já existe, retorna um erro
    }

    const hashedPassword = await hash(password,8);//Criptografando a senha

    await database.run("INSERT INTO users(name, email, password) VALUES(?,?,?)",
      [name, email, hashedPassword]);//Executando o comando no banco de dados

    return response.status(201).json()//Retornando o status 201

  }
  async update(request, response) {
    const {name, email, password, old_password} = request.body;//Recebendo os dados do formulario
    const { id } = request.params;//Recebendo o id do registro

    const database = await sqliteConnection();//Conectando ao banco de dados
    const user = await database.get("SELECT * FROM users WHERE id =(?)", [id]);//Selecionando o usuario pelo id

    if(!user){
      throw new AppError("User not found", 404); //Se o usuario não for encontrado, retorna um erro
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
      throw new AppError("Email ja em uso.");
    }

    user.name = name ?? user.name
    user.email = email ?? user.email;

    if (password && !old_password){
      throw new AppError("Voce precisa informar a senha antiga para definir a nova senha"); //Se a senha antiga nao for informada retorna a mensagem
    } 

    if(password && old_password){
      const checkOldPassword = await compare(old_password, user.password);//comparando a senha antiga com a senha atual

      if(!checkOldPassword){
        throw new AppError("A senha nao confere"); //Se a senha antiga for incorreta retorna a mensagem
      }

      user.password = await hash(password,8);
    }

    await database.run(`
    UPDATE users SET
    name = ?,
    email = ?,
    password =? ,
    updated_at = DATETIME('now')
    WHERE id= ?`,
    [user.name, user.email,user.password, id]
    );
    return response.status(200).json()//Retornando o status 200
  };
}

 //Criando o controller
//usamos a classe porque dentro dela ela permite criar varias funcoes, um controler pode ter no maximo 5 metodos dentro dele sao:
/* 
create- POST para criar um registro
Index -GET Para listar varios registro
show - GET para exibir um registro especifico
update -PUT para atualizar um registro
delete - DELTE para remover um registro
*/
module.exports = UsersController;
