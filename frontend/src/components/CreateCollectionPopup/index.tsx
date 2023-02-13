import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import ReactMarkdown from 'react-markdown';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextareaAutosize,
  TextField,
} from '@mui/material';
import Typography from '@mui/material/Typography';

import { FILE_TYPES } from '../../constants/base';
import { AdditionalFields, Collection } from '../../constants/collection';
import { AdditionalField } from '../AdditionalField';
import { CustomDialogTitle } from '../DialogTitle';

import { AdditionalItemsWrapper, DialogItem, Markdown } from './styled';

import styles from './styles.module.css';

export const CreateCollectionPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdditing, setIsEdditing] = useState(false);
  const [markdown, setMarkdown] = useState('');
  const [type, setType] = useState<Collection>(Collection.ALCOHOL);
  const [image, setImage] = useState<File | null>(null);
  const textArea = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEdditing) {
      textArea.current?.focus();
      textArea.current?.setSelectionRange(markdown.length, markdown.length);
    }
  }, [isEdditing]);

  const handleButtonClick = () => setIsOpen(prev => !prev);
  const handleDialogClose = () => setIsOpen(false);

  const handleTextAreaInput = (e: ChangeEvent<HTMLTextAreaElement>) => setMarkdown(e.target.value);
  const handleTextAreaFocus = () => setIsEdditing(true);
  const handleTextAreaBlur = () => setIsEdditing(false);

  const handleSelect = (e: SelectChangeEvent<string>) => setType(e.target.value as Collection);

  const handleImageUpload = (file: File) => {
    console.log(file, image);
    setImage(file);
  };

  return (
    <Box>
      <Button onClick={handleButtonClick} variant="contained">
        <Typography sx={{ textTransform: 'none' }}>Create collection</Typography>
      </Button>
      <Dialog onClose={handleDialogClose} open={isOpen} maxWidth="lg" fullWidth={true}>
        <CustomDialogTitle onClose={handleDialogClose}>
          <Typography fontSize={24}>Create collection</Typography>
        </CustomDialogTitle>
        <DialogContent dividers={true}>
          <DialogItem>
            <Typography component="label" htmlFor="name">
              Collection name
            </Typography>
            <TextField id="name" size="small" />
          </DialogItem>
          <DialogItem>
            <Typography component="label" htmlFor="description">
              Collection description
            </Typography>
            {isEdditing || !markdown ? (
              <TextareaAutosize
                id="description"
                ref={textArea}
                value={markdown}
                onFocus={handleTextAreaFocus}
                onChange={handleTextAreaInput}
                onBlur={handleTextAreaBlur}
                maxRows={10}
                style={{
                  padding: 10,
                  fontSize: 18,
                  maxHeight: 200,
                  minHeight: 200,
                  boxSizing: 'border-box',
                  borderRadius: 5,
                }}
              />
            ) : (
              <Markdown onClick={handleTextAreaFocus}>
                <ReactMarkdown>{markdown}</ReactMarkdown>
              </Markdown>
            )}
          </DialogItem>
          <DialogItem>
            <Typography component="label" htmlFor="type">
              Collection type
            </Typography>
            <Select id="type" value={type} onChange={handleSelect}>
              <MenuItem value={Collection.ALCOHOL}>Alcohol</MenuItem>
              <MenuItem value={Collection.BOOKS}>Books</MenuItem>
              <MenuItem value={Collection.MOVIES}>Movies</MenuItem>
              <MenuItem value={Collection.HEROES}>Heroes</MenuItem>
              <MenuItem value={Collection.CARS}>Cars</MenuItem>
            </Select>
          </DialogItem>
          <DialogItem>
            <Typography component="label">Collection image</Typography>
            <FileUploader
              classes={styles.drop}
              types={FILE_TYPES}
              handleChange={handleImageUpload}
            />
          </DialogItem>
          <DialogItem>
            <Typography component="label">Additional fields</Typography>
            <AdditionalItemsWrapper>
              <AdditionalField type={AdditionalFields.STRING} />
              <AdditionalField type={AdditionalFields.NUMBER} />
              <AdditionalField type={AdditionalFields.TEXT} />
              <AdditionalField type={AdditionalFields.CHECKBOX} />
              <AdditionalField type={AdditionalFields.DATE} />
            </AdditionalItemsWrapper>
          </DialogItem>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
