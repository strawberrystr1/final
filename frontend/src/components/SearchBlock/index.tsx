import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, IconButton, OutlinedInput, Popover, Tooltip } from '@mui/material';

import { useSearchQuery } from '../../redux/api/search';

export const SearchBlock = () => {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const anchorElem = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();

  const { data } = useSearchQuery(value);
  console.log('data: ', data);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  const handleButtonClick = () => setValue('');
  const closePopover = () => setIsOpen(false);

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
      <Popover
        open={isOpen}
        onClose={closePopover}
        anchorEl={anchorElem.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{ width: 200, height: 200 }}
      >
        The content of the Popover.
      </Popover>
    </Box>
  );
};
