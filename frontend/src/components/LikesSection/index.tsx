import { Dispatch, FC, SetStateAction, useCallback, useEffect } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, IconButton, Typography } from '@mui/material';

import { useGetItemLikesQuery, useUpdateLikeMutation } from '../../redux/api/likes';
import { useAppSelector } from '../../redux/hooks';

import { Wrapper } from './styled';

interface IProps {
  collectionId: string;
  itemId: string;
  likesCount: number;
  currentLikeId: number;
  setLikesCount: Dispatch<SetStateAction<number>>;
  setCurrentLikeId: Dispatch<SetStateAction<number>>;
}

export const LikesSection: FC<IProps> = ({
  collectionId,
  itemId,
  likesCount,
  setLikesCount,
  currentLikeId,
  setCurrentLikeId,
}) => {
  const { id, isLogged } = useAppSelector(state => state.user);
  const { data } = useGetItemLikesQuery([collectionId, itemId]);
  const [updateLike] = useUpdateLikeMutation();

  useEffect(() => {
    if (data) {
      setLikesCount(data.count);
      setCurrentLikeId(data.id);
    } else {
      setLikesCount(0);
      setCurrentLikeId(-1);
    }
  }, [data]);

  const handleClick = useCallback(() => {
    if (!data || !data?.users.includes(id) || currentLikeId < 0) {
      updateLike({
        collectionId,
        itemId,
        userId: id,
        type: 'add',
        currentCount: likesCount || 1,
        id: currentLikeId < 0 ? undefined : currentLikeId,
      });
    } else {
      updateLike({
        collectionId,
        itemId,
        userId: id,
        type: 'remove',
        currentCount: likesCount || 1,
        id: currentLikeId,
      });
    }
  }, [data, currentLikeId, likesCount]);

  return (
    <Wrapper>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={handleClick} disabled={!isLogged}>
          {data?.users?.includes(id) && likesCount > 0 ? (
            <FavoriteIcon htmlColor="red" />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        <Typography>{likesCount}</Typography>
      </Box>
    </Wrapper>
  );
};
