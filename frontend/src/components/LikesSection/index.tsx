import { FC, useCallback, useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, IconButton, Typography } from '@mui/material';

import { API_URL, SSE_STREAM } from '../../constants/api';
import { useGetItemLikesQuery, useUpdateLikeMutation } from '../../redux/api/likes';
import { useAppSelector } from '../../redux/hooks';
import { IComment } from '../../types/comment';
import { ILike } from '../../types/like';

import { Wrapper } from './styled';

interface IProps {
  collectionId: string;
  itemId: string;
}

export const LikesSection: FC<IProps> = ({ collectionId, itemId }) => {
  const { id } = useAppSelector(state => state.user);
  const { data } = useGetItemLikesQuery([collectionId, itemId]);
  const [likesCount, setLikesCount] = useState(0);
  const [currentLikeId, setCurrentLikeId] = useState(-1);
  console.log('data: ', data);
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

  useEffect(() => {
    const sse = new EventSource(`${API_URL}${SSE_STREAM(collectionId, itemId)}`);

    sse.onmessage = e => {
      const parsed: ILike | IComment = JSON.parse(e.data);
      if ('count' in parsed) {
        setLikesCount(parsed.count);
        setCurrentLikeId(parsed.id);
      }
    };

    return () => {
      sse.close();
    };
  }, []);

  const handleClick = useCallback(() => {
    if (!data || !data?.users.includes(id) || currentLikeId < 0) {
      updateLike({
        collectionId,
        itemId,
        userId: id,
        type: 'add',
        currentCount: data?.count || 1,
        id: currentLikeId < 0 ? undefined : currentLikeId,
      });
    } else {
      updateLike({
        collectionId,
        itemId,
        userId: id,
        type: 'remove',
        currentCount: data?.count || 1,
        id: currentLikeId,
      });
    }
  }, [data, currentLikeId]);

  return (
    <Wrapper>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={handleClick}>
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
