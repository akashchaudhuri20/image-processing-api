import express from 'express';

const cachedImages: { [key: string]: Buffer } = {};

const setCache = (key: string, value: Buffer): void => {
  cachedImages[key] = value;
};

const getCache = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const key: string =
    req.query.fileName + '_' + req.query.width + '_' + req.query.height;

  if (cachedImages[key] != null) {
    const cachedImage = cachedImages[key];
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    return res.end(cachedImage);
  } else {
    next();
  }
};

export default {
  setCache,
  getCache,
};
