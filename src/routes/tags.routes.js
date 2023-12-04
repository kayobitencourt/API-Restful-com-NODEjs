const { Router } = require("express");

const TagsController = require("../controllers/TagsController"); //Importando o usercontrollers

const tagsRoutes = Router();//Criando uma rota de usuarios

const tagsController = new TagsController();

tagsRoutes.get("/:user_id", tagsController.index);

module.exports = tagsRoutes;
