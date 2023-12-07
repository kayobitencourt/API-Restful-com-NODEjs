const { Router } = require("express");//Criando uma rota

const usersRouter = require("./users.routes");//Criando uma rota de usuarios
const notesRouter = require("./notes.routes");//Criando uma rota de usuarios
const tagsRouter = require("./tags.routes");//Criando uma rota de usuarios
const sessionsRouter = require("./sessions.routes");//Criando uma rota de usuarios

const routes = Router();//Criando uma rota
routes.use("/users", usersRouter);//Adicionando a rota de usuarios
routes.use("/sessions", sessionsRouter);
routes.use("/notes", notesRouter);
routes.use("/tags", tagsRouter);


module.exports = routes;//Exportando a rota
