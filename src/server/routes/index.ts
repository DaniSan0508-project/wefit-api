import { Router } from 'express';
import { ProfileController } from '../controllers/profile';

const router = Router();


router.get('/', (req, res) => {
  return res.send('funcionando');
});

router.post('/profile', ProfileController.createBodyValidation ,ProfileController.create);

export { router };