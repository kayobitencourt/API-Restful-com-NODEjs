const { Router } = require("express");

const NotesController = require("../controllers/NotesController"); //Importando o usercontrollers
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const notesRoutes = Router();//Criando uma rota de usuarios

// function myMiddleware(request, response, next) {
//   console.log(" Voce passou pelo middlewar!");

//   if (!request.body.isAdmin) {
//     return response.json({ message: "user unauthorized" });
//   }
//   next();
// }

const notesController = new NotesController();
// usersRoutes.use(myMiddleware); // Aplicando o middleware para todas as rotas
notesRoutes.use(ensureAuthenticated);// Aplicando o middleware para todas as rotas

notesRoutes.post("/", notesController.create);
notesRoutes.get("/", notesController.index);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);
module.exports = notesRoutes;
