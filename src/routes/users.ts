import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateUserAvatar);
router.get('/:userId', getUserById);

export default router;
