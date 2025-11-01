import { Router } from 'express';

import {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} from '../controllers/cards';
import { validateCreateCard, validateParamsId } from '../middlewares/validators';

const router = Router();

router.get('/', getCards);
router.post('/', validateCreateCard, createCard);
router.put('/:cardId/likes', validateParamsId, likeCard);
router.delete('/:cardId/likes', validateParamsId, dislikeCard);
router.delete('/:cardId', validateParamsId, deleteCard);

export default router;
