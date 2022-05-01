import express, { Request, Response } from 'express';
import { User } from '../models/user';
import Image from '../models/image';
import { NotFoundError } from '../errors/not-found-error';
import sequelize from '../db/config';
import { QueryTypes } from 'sequelize';

const router = express.Router();

router.get('/:id/karma-position', async (req: Request, res: Response) => {
  const userId = req.params.id;
  const users = await sequelize.query(
    `
  select 
    user.id as id, 
    users_position.position as position, 
    user.username as username, 
    user.karma_score as karma_score, 
    image.url as image_url
    from users as user
    left outer join images as image on user.image_id = image.id
    join (select id, row_number() over ( order by karma_score desc, username) as position from users) users_position on users_position.id = user.id
  `,
    {
      model: User,
      mapToModel: true,
    }
  );

  const userIndex = users.findIndex((user) => {
    return user.id.toString() === userId;
  });
  if (!userIndex) {
    throw new NotFoundError();
  }

  const result = Array<User>();
  let startIndex: number = 0;
  
  if (userIndex === 0) {
    startIndex = 0;
  } else if (userIndex + 1 === users.length) {
    startIndex = users.length - 4;
  } else {
    startIndex = userIndex - 2;
  }

  for (let i = 0; i < 5; i++) {
    const user = users[startIndex];
    if (user) {
      result.push(user);
    }

    startIndex++;
  }
  
  res.send(result);
});

export { router as userRouter };
