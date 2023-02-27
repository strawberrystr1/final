import { ChangeEvent, FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Typography } from '@mui/material';

import { useCreateItemCommentMutation } from '../../redux/api/comment';
import { useAppSelector } from '../../redux/hooks';
import { IComment } from '../../types/comment';

import { CommentWrapper, CreateWrapper, Textarea, Wrapper } from './styles';

interface IProps {
  collectionId: string;
  itemId: string;
  commentsData: IComment[];
  isOwner: boolean;
}

export const CommentsSection: FC<IProps> = ({ collectionId, itemId, commentsData, isOwner }) => {
  const [comment, setComment] = useState('');
  const [createComment] = useCreateItemCommentMutation();
  const { id, theme } = useAppSelector(state => state.user);
  const { t } = useTranslation();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value);

  const handleCommentCreate = () => {
    createComment({
      collectionId,
      itemId: +itemId,
      userId: id,
      comment,
    });
    setComment('');
  };

  return (
    <Wrapper>
      <CreateWrapper>
        <Textarea
          value={comment}
          onChange={handleChange}
          placeholder={t('placeholder.comment') || ''}
        />
        <Button
          onClick={handleCommentCreate}
          variant="contained"
          sx={{ alignSelf: 'flex-end', mt: 1 }}
          disabled={!comment || !isOwner}
        >
          {t('send')}
        </Button>
      </CreateWrapper>
      {commentsData.length > 0 ? (
        commentsData.map(item => (
          <CommentWrapper key={item.id} theme={theme}>
            <Typography>{item.comment}</Typography>
          </CommentWrapper>
        ))
      ) : (
        <CommentWrapper theme={theme}>
          <Typography>{t('no_comments')}</Typography>
        </CommentWrapper>
      )}
    </Wrapper>
  );
};
