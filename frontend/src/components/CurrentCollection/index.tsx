import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';

import { useGetOneCollectionQuery } from '../../redux/api/collection';
import Loader from '../Loader';

import { FlexWrapper, ImageWrapper, MarkdownWrapper, SideBlock } from './styled';

export const CurrentCollection = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const collectionId = pathname.replace(/\D/g, '');

  const { data, isLoading } = useGetOneCollectionQuery(+collectionId);

  return isLoading ? (
    <Loader />
  ) : (
    <FlexWrapper>
      <SideBlock>
        <FlexWrapper>
          <Typography fontSize={24}>{t('collection.name')}: &nbsp;</Typography>
          <Typography fontWeight={600} fontSize={24}>
            {data?.name}
          </Typography>
        </FlexWrapper>
        <FlexWrapper>
          <Typography fontSize={24}>{t('collection.type')}: &nbsp;</Typography>
          <Typography fontWeight={600} fontSize={24}>
            {data?.theme}
          </Typography>
        </FlexWrapper>
        <Typography fontSize={24}>{t('collection.image')}:</Typography>
        {data?.image && <ImageWrapper src={data.image} />}
      </SideBlock>
      <SideBlock>
        <Typography fontSize={24}>{t('collection.description')}</Typography>
        <MarkdownWrapper>
          <ReactMarkdown>{data?.description as string}</ReactMarkdown>
        </MarkdownWrapper>
      </SideBlock>
    </FlexWrapper>
  );
};
