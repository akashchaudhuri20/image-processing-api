import path from 'path';
import resizeProcessor from '../../processor/resizeProcessor';

let inputFilePath: string;
let width: number;
let height: number;

beforeEach(() => {
  inputFilePath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'original_images',
    'palmtunnel.jpg'
  );
  width = 400;
  height = 300;
});

describe('Testing Resize Processor', () => {
  it('Should verify the response of the resize processor', async () => {
    const bufferData: Buffer | null = await resizeProcessor(
      inputFilePath,
      width,
      height
    );
    expect(bufferData).not.toBeNull();
  });
});
