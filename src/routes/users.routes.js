const { Router } = require("express");
const multer = require("multer");
const UsersController = require("../controllers/UsersController");
const UserAvatarController = require("../controllers/UserAvatarController"); //Importando o usercontrollers
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const usersRoutes = Router();//Criando uma rota de usuarios

//Config upload de img
const uploadConfig = require("../configs/upload")
const upload = multer(uploadConfig.MULTER)
//
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update);


module.exports = usersRoutes;
