import sharp from 'sharp';

const resizeImage = async (
  filepath: string,
  width: number,
  height: number
): Promise<Buffer> => {
  try {
    return await sharp(filepath).resize({ width, height }).toBuffer();
  } catch (e) {
    throw new Error('Failed to access/resize image.');
  }
};

export default resizeImage;
