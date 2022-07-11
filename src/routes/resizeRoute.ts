import express from 'express';
import resizeController from '../controller/resizeController';
import logger from '../middleware/logger';
import cache from '../middleware/cacher';

const routes = express.Router();

routes.get('/resize', logger, cache.getCache, resizeController);

export default routes;
