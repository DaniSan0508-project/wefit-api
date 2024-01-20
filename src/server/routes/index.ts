import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();


router.get('/ping', (req, res) => {
  return res.send('pong');
});

router.post('/teste', (req, res) => {
  console.log(req.body);
  return res.status(StatusCodes.ACCEPTED).json('teste');
});

export { router };