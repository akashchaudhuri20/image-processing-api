import express from 'express';

const cachedImages: { [key: string]: Buffer } = {};

const setCache = (key: string, value: Buffer): void => {
  cachedImages[key] = value;
};

const getCache = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): express.Response | void => {
  const key: string =
    req.query.filename + '_' + req.query.width + '_' + req.query.height;
  console.log('Filename: ' + req.query.filename);
  console.log('Width: ' + req.query.width);
  console.log('Height: ' + req.query.height);
  if (cachedImages[key] != null) {
    const cachedImage = cachedImages[key];
    console.log('Returning from Cache');
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    return res.end(cachedImage);
  } else {
    next();
  }
};

export default { setCache, getCache };
