const { Router } = require('express');

const SessionsController = require('../controllers/SessionsController');
const sessionsController = new SessionsController();//Instanciando e alocando a classe na memoria e armazenando

const sessionsRouter = Router();

sessionsRouter.post('/', sessionsController.create);

module.exports = sessionsRouter;