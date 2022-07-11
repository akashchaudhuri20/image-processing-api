import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Testing Image Processing API', () => {
  it('Should return 500 as response code for file access issue', async () => {
    const response = await request.get(
      '/imageProcessing/resize?filename=iceland.waterfall&width=300&height=300'
    );
    expect(response.status).toBe(500);
  });

  it('Should return 501 as response code for invalid filename', async () => {
    const response = await request.get(
      '/imageProcessing/resize?filename=&height=300&width=300'
    );
    expect(response.status).toBe(501);
  });

  it('Should return 502 as response code for invalid width', async () => {
    const response = await request.get(
      '/imageProcessing/resize?filename=icelandwaterfall&width=0&height=300'
    );
    expect(response.status).toBe(502);
  });

  it('Should return 503 as response code for invalid height', async () => {
    const response = await request.get(
      '/imageProcessing/resize?filename=icelandwaterfall&width=300&height=0'
    );
    expect(response.status).toBe(503);
  });

  it('Should process image successfully and return 200 as response status', async () => {
    const response = await request.get(
      '/imageProcessing/resize?filename=icelandwaterfall&width=300&height=300'
    );
    expect(response.status).toBe(200);
  });
});
