import express from 'express';
import path from 'path';
import { promises as fsPromises } from 'fs';
import resizeProcessor from '../processor/resizeProcessor';
import cache from '../middleware/cache';

const resize = async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    const originalFilePath = path.join(__dirname, '..', '..', 'original_images');
    const newFileDirectory = path.join(__dirname, '..', '..', 'processed_images');
  
    const fileName = req.query.filename;
    const width: number = parseInt(req.query.width as string);
    const height: number = parseInt(req.query.height as string);
  
    // Request Validation
    if (fileName === '') {
      // Filename Validation
      return res.status(501).send({ message: 'Invalid filename.' });
    } else if (width === 0) {
      // Width Validation
      return res.status(502).send({ message: 'Invalid width.' });
    } else if (height === 0) {
      // Height Validation
      return res.status(503).send({ message: 'Invalid height.' });
    } 
      // Logging Valid Input
      const fileNameWithExtension = req.query.filename + '.jpg';
      console.log('Filename: ' + fileNameWithExtension);
      console.log('Width: ' + width);
      console.log('Height: ' + height);
  
      let resizedImage;
  
      // Invoking the resizeProcessor
      try {
        resizedImage = await resizeProcessor(`${originalFilePath}/${fileNameWithExtension}`, height, width);
      } catch (e) {
        return res
          .status(500)
          .send({ message: 'Failed to access/resize image.' });
      }
      console.log('Successfully Processed Image');
  
      try {
        // writing the processed data to a new file
        const newFilePath = `${newFileDirectory}/${fileName}_${width}_${height}.jpg`;
        await fsPromises.writeFile(newFilePath, resizedImage);
        console.log('Successfully Saved Image');
      } catch (e) {
        return res.status(500).send({ message: 'Error saving the file' });
      }
  
      cache.setCache(`${fileName}_${width}_${height}`, resizedImage);
      console.log('Set to Cache');
  
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      return res.end(resizedImage);
    
  };

  export default resize;

