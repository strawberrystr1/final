import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TagCloud } from 'react-tagcloud';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
  Box,
  ClickAwayListener,
  IconButton,
  OutlinedInput,
  Tooltip,
  Typography,
} from '@mui/material';

import { useSearchQuery } from '../../redux/api/search';

import { TagsPopover } from './styled';
import { Tag } from './Tag';

export const SearchBlock = () => {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const anchorElem = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();

  const { data } = useSearchQuery(value);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  const handleButtonClick = () => setValue('');
  const closePopover = () => {
    setIsOpen(false);
    setValue('');
  };

  useEffect(() => {
    if (value) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [value]);

  return (
    <Box ref={anchorElem}>
      <OutlinedInput
        sx={{ maxHeight: 40, borderRadius: 20, p: 0, color: 'black', bgcolor: 'white', width: 300 }}
        value={value}
        onChange={handleInput}
        endAdornment={
          <Tooltip title={t('clear_search')}>
            <IconButton onClick={handleButtonClick}>
              <HighlightOffIcon htmlColor="black" />
            </IconButton>
          </Tooltip>
        }
      />
      <ClickAwayListener onClickAway={closePopover}>
        <TagsPopover open={isOpen} anchorEl={anchorElem.current}>
          {data && data.length > 0 ? (
            <TagCloud
              minSize={12}
              maxSize={35}
              tags={data}
              renderer={Tag}
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
