const { Router } = require("express");

const UsersController = require("../controllers/UsersController"); //Importando o usercontrollers
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const usersRoutes = Router();//Criando uma rota de usuarios

// function myMiddleware(request, response, next) {
//   console.log(" Voce passou pelo middlewar!");

//   if (!request.body.isAdmin) {
//     return response.json({ message: "user unauthorized" });
//   }
//   next();
// }

const usersController = new UsersController();
// usersRoutes.use(myMiddleware); // Aplicando o middleware para todas as rotas
usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);

module.exports = usersRoutes;
