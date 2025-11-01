import { Router } from 'express';
import {
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar, getUserInfo,
} from '../controllers/users';
import { validateParamsId, validateUpdateUserAvatar, validateUpdateUserInfo } from '../middlewares/validators';

const router = Router();

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.patch('/me', validateUpdateUserInfo, updateUserInfo);
router.patch('/me/avatar', validateUpdateUserAvatar, updateUserAvatar);
router.get('/:userId', validateParamsId, getUserById);

export default router;
