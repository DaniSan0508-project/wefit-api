import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../../swaggerOptions';
import 'dotenv/config';

import { router } from './routes';

const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(router);


export { app };


