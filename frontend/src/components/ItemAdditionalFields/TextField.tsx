import { FC, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, TextareaAutosize, Typography } from '@mui/material';

import { useAppSelector } from '../../redux/hooks';

import { IProps } from '.';

export const TextField: FC<IProps> = ({ name, formik }) => {
  const [isEdditing, setIsEdditing] = useState(false);
  const textArea = useRef<HTMLTextAreaElement | null>(null);
  const { theme } = useAppSelector(state => state.user);

  useEffect(() => {
    if (isEdditing) {
      textArea.current?.focus();
      textArea.current?.setSelectionRange(0, 0);
    }
  }, [isEdditing]);

  const handleInputFocus = () => setIsEdditing(true);
  const handleInputBlur = () => setIsEdditing(false);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
      <Typography sx={{ width: '100%', maxWidth: 150 }} fontSize={20}>
        {name}
      </Typography>
      {isEdditing ? (
        <TextareaAutosize
          id={name}
          name={name}
          ref={textArea}
          value={formik.values[name] as string}
          onFocus={handleInputFocus}
          onChange={formik.handleChange}
          onBlur={handleInputBlur}
          maxRows={10}
          style={{
            padding: 10,
            fontSize: 18,
            maxHeight: 200,
            minHeight: 100,
            boxSizing: 'border-box',
            borderRadius: 5,
            border: `${
              formik.touched.description && !!formik.errors.description ? '1px solid #ef6a67' : ''
            }`,
          }}
        />
      ) : (
        <Box
          onClick={handleInputFocus}
          sx={{
            maxHeight: 40,
            minHeight: 40,
            borderRadius: '5px',
            border: `1px solid ${
              theme === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0,0, 0.23)'
            }`,
            mb: '7px',
            padding: '8px',
            width: 350,
            wordBreak: 'break-word',
            overflow: 'auto',
          }}
        >
          <ReactMarkdown>{formik.values[name] as string}</ReactMarkdown>
        </Box>
      )}
    </Box>
  );
};
