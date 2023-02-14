import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';

import {
  COLLECTION_CARD_DESCRIPTION_HEIGHT,
  COLLECTION_CARD_IMAGE_HEIGHT,
  COLLECTION_CARD_WIDTH,
} from '../../constants/base';
import { IUserCollectionsResponse } from '../../types/collection';

interface IProps {
  collection: IUserCollectionsResponse;
}

export const CollectionItem: FC<IProps> = ({ collection }) => {
  const { name, image, description, theme, id } = collection;

  return (
    <Card sx={{ width: COLLECTION_CARD_WIDTH }}>
      <Link to={`/collection/${id}`} style={{ textDecoration: 'none', color: 'white' }}>
        <CardHeader
          action={<Typography>{id}</Typography>}
          title={name}
          titleTypographyProps={{ fontSize: 18 }}
          subheader={theme}
        />
        {image && (
          <CardMedia
            component="img"
            height={COLLECTION_CARD_IMAGE_HEIGHT}
            image={image}
            alt={`${name} image`}
          />
        )}
        <CardContent sx={{ maxHeight: COLLECTION_CARD_DESCRIPTION_HEIGHT, overflow: 'auto' }}>
          <ReactMarkdown>{description}</ReactMarkdown>
        </CardContent>
      </Link>
    </Card>
  );
};
