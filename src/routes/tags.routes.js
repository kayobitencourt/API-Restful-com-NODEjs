const { Router } = require("express");

const TagsController = require("../controllers/TagsController"); //Importando o usercontrollers
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const tagsRoutes = Router();//Criando uma rota de usuarios

const tagsController = new TagsController();

tagsRoutes.get("/",ensureAuthenticated, tagsController.index);

module.exports = tagsRoutes;
