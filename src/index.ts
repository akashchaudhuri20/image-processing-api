import express from 'express';
import resize from './routes/resizeRoute';

const app = express();
const port = 3000;

app.listen(port, () => console.log('Listening on port: ' + port));

app.use('/imageProcessing', resize);

export default app;
