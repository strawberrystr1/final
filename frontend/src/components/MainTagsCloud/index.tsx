import { useRef, useState } from 'react';
import { TagCloud } from 'react-tagcloud';
import { Box, ClickAwayListener, Typography } from '@mui/material';
import { t } from 'i18next';

import { useGetTagsCloudQuery } from '../../redux/api/tags';
import { useAppSelector } from '../../redux/hooks';
import { IMainTagsCloudItem } from '../../types/base';
import { TagsPopover } from '../SearchBlock/styled';

import { LinkTag } from './LinkTag';
import { MainTag } from './Tag';

export const MainTagsCloud = () => {
  const [isShown, setIsShown] = useState(false);
  const [innerTags, setInnerTags] = useState<{ value: string }[]>([]);
  const anchorElem = useRef<HTMLDivElement>(null);
  const { theme } = useAppSelector(state => state.user);
  const { data } = useGetTagsCloudQuery();

  const handleMainTagClick = (tag: IMainTagsCloudItem) => {
    setInnerTags(tag.links);
    setIsShown(true);
  };

  const closePopover = (e: Event) => {
    if ((e.target as HTMLElement).nodeName !== 'SPAN') {
      setIsShown(false);
      setInnerTags([]);
    }
  };

  const border = theme === 'dark' ? '1px solid white' : '1px solid black';

  return (
    <Box sx={{ p: '10px', border, borderRadius: 2, mt: 2 }} ref={anchorElem}>
      <Typography fontWeight={600} fontSize={28} gutterBottom={true}>
        {t('main_cloud')}
      </Typography>
      {data && (
        <TagCloud
          minSize={12}
          maxSize={24}
          tags={data}
          renderer={MainTag}
          onClick={handleMainTagClick}
        />
      )}
      <ClickAwayListener onClickAway={closePopover}>
        <TagsPopover
          open={isShown}
          anchorEl={anchorElem.current}
          popperOptions={{ placement: 'bottom-start' }}
        >
          {innerTags.length > 0 ? (
            <TagCloud
              minSize={12}
              maxSize={35}
              tags={innerTags}
              renderer={LinkTag}
              disableRandomColor={true}
            />
          ) : (
            <Typography>{t('no_items')}</Typography>
          )}
        </TagsPopover>
      </ClickAwayListener>
    </Box>
  );
};
