import express from 'express';
import resizeController from '../controller/resizeController';
import logger from '../middleware/logger';
import cacher from '../middleware/cacher';

const routes = express.Router();

routes.get('/resize', logger, cacher.getCache, resizeController);

export default routes;
