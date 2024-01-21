import { Router } from 'express';
import { ProfileController } from '../controllers/profile';

const router = Router();


router.get('/getProfile/:tableName', ProfileController.getAll);

router.post('/profile', ProfileController.createBodyValidation ,ProfileController.create);

export { router };