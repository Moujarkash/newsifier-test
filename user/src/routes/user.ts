import express, { Request, Response } from 'express';
import { User } from '../models/user';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.send(users);
});

export { router as userRouter };
