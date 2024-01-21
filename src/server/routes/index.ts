import { Router } from 'express';
import { ProfileController } from '../controllers/profile';

const router = Router();


router.get('/getProfile/:tableName', ProfileController.getAll);

/**
 * @swagger
 * /profile:
 *   post:
 *     summary: Cria um novo perfil de pessoa física ou jurídica
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Informações do perfil
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             acceptTerms:
 *               type: boolean
 *             name:
 *               type: string
 *             state:
 *               type: string
 *             email:
 *               type: string
 *             personType:
 *               type: string
 *             cpf:
 *               type: string
 *             cnpj:
 *               type: string
 *             cellphone:
 *               type: string
 *             zipCode:
 *               type: string
 *             address:
 *               type: string
 *             number:
 *               type: string
 *             city:
 *               type: string
 *             district:
 *               type: string
 *     responses:
 *       201:
 *         description: Perfil criado com sucesso
 *       400:
 *         description: Requisição inválida
 */


router.post('/profile', ProfileController.createBodyValidation ,ProfileController.create);

export { router };