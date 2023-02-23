import { sendItemUpdatesToAll } from "../controllers/item.controller";
import Like from "../models/like.model";
import User from "../models/user.model";
import UsersLike from "../models/usersLike.model";
import { ILikeWithUsers, IUpdateLikePayload } from "../types/like";
import { mapLike } from "../utils/mappers";

export const getItemLikes = async (id: string) => {
  const like = (
    await Like.findOne({ where: { itemId: +id }, include: [User] })
  )?.toJSON() as ILikeWithUsers;

  return mapLike(like);
};

export const updateLike = async (data: IUpdateLikePayload) => {
  const { id, userId, type, itemId, currentCount } = data;

  if (!id && type === "add") {
    const like = await Like.create(
      { count: currentCount, itemId },
      { returning: true }
    );
    await updateUserLikeJunction(userId, like.toJSON().id);
    sendItemUpdatesToAll(like.toJSON());
    return like;
  }

  if (type === "add") {
    const [count, like] = await Like.update(
      { count: currentCount + 1 },
      { where: { id }, returning: true }
    );
    await updateUserLikeJunction(userId, like[0].toJSON().id);
    sendItemUpdatesToAll(like[0].toJSON());
    return like[0];
  } else {
    if (currentCount - 1 === 0) {
      await Like.destroy({ where: { id } });
      await updateUserLikeJunction(userId, id as number, true);
      sendItemUpdatesToAll({ count: 0 });
    } else {
      const [count, like] = await Like.update(
        { count: currentCount - 1 },
        { where: { id }, returning: true }
      );
      await updateUserLikeJunction(userId, like[0].toJSON().id, true);
      sendItemUpdatesToAll(like[0].toJSON());
      return like[0];
    }
  }
};

export const updateUserLikeJunction = async (
  userId: number,
  likeId: number,
  isDelleting = false
) => {
  if (isDelleting) {
    await UsersLike.destroy({ where: { userId, likeId } });
  } else {
    await UsersLike.findOrCreate({
      where: { userId, likeId },
      defaults: { userId, likeId }
    });
  }
};
