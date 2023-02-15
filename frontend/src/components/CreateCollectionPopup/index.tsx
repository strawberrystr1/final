import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { FormikProps, useFormik } from 'formik';

import { AdditionalFields, Collection } from '../../constants/collection';
import { useCreateMutation } from '../../redux/api/collection';
import { ICreateCollectionForm } from '../../types/formik';
import useValidationSchema from '../../utils/collectionValidationSchema';
import storage from '../../utils/firebase';
import { AdditionalField } from '../AdditionalField';
import { CustomDialogTitle } from '../DialogTitle';
import { FileUploader } from '../FileUploader';

import { AdditionalItemsWrapper, DialogItem, Markdown } from './styled';

const formikInitialValues: ICreateCollectionForm = {
  name: '',
  description: '',
  theme: Collection.ALCOHOL,
  image: null,
  string1: '',
  string2: '',
  string3: '',
  number1: '',
  number2: '',
  number3: '',
  text1: '',
  text2: '',
  text3: '',
  checkbox1: '',
  checkbox2: '',
  checkbox3: '',
  date1: '',
  date2: '',
  date3: '',
};

export type FormikType = FormikProps<ICreateCollectionForm>;

export const CreateCollectionPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdditing, setIsEdditing] = useState(false);
  const textArea = useRef<HTMLTextAreaElement>(null);
  const validationSchema = useValidationSchema();
  const { t } = useTranslation();
  const [createCollection] = useCreateMutation();

  const handleSubmitForm = (values: ICreateCollectionForm) => {
    if (values.image) {
      const storageRef = ref(storage, `/files/${values.image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, values.image);
      uploadTask.then(() => {
        const refer = ref(storage, `/files/${values.image?.name}`);
        getDownloadURL(refer).then(url => {
          createCollection({ ...values, image: url });
        });
      });
    } else {
      createCollection({ ...values, image: '' });
    }
  };

  const formik = useFormik({
    initialValues: formikInitialValues,
    onSubmit: handleSubmitForm,
    validationSchema,
  });

  useEffect(() => {
    if (isEdditing) {
      textArea.current?.focus();
      textArea.current?.setSelectionRange(
        formik.values.description.length,
        formik.values.description.length
      );
    }
  }, [isEdditing]);

  const handleButtonClick = () => setIsOpen(prev => !prev);
  const handleDialogClose = () => {
    setIsOpen(false);
    formik.resetForm();
  };

  const handleTextAreaFocus = () => setIsEdditing(true);
  const handleTextAreaBlur = () => setIsEdditing(false);

  return (
    <>
      <Button onClick={handleButtonClick} variant="contained">
        <Typography sx={{ textTransform: 'none' }}>{t('collection.create')}</Typography>
      </Button>
      <Dialog onClose={handleDialogClose} open={isOpen} maxWidth="lg" fullWidth={true}>
        <form onSubmit={formik.handleSubmit}>
          <CustomDialogTitle onClose={handleDialogClose}>
            <Typography fontSize={24}>{t('collection.create')}</Typography>
          </CustomDialogTitle>
          <DialogContent dividers={true}>
            <DialogItem>
              <Typography component="label" htmlFor="name">
                {t('collection.name')}
              </Typography>
              <TextField
                id="name"
                size="small"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && !!formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
              />
            </DialogItem>
            <DialogItem>
              <Typography component="label" htmlFor="description">
                {t('collection.description')}
              </Typography>
              {isEdditing || !formik.values.description ? (
                <TextareaAutosize
                  id="description"
                  name="description"
                  ref={textArea}
                  value={formik.values.description}
                  onFocus={handleTextAreaFocus}
                  onChange={formik.handleChange}
                  onBlur={handleTextAreaBlur}
                  maxRows={10}
                  style={{
                    padding: 10,
                    fontSize: 18,
                    maxHeight: 200,
                    minHeight: 200,
                    boxSizing: 'border-box',
                    borderRadius: 5,
                    border: `${
                      formik.touched.description && !!formik.errors.description
                        ? '1px solid #ef6a67'
                        : ''
                    }`,
                  }}
                />
              ) : (
                <Markdown onClick={handleTextAreaFocus}>
                  <ReactMarkdown>{formik.values.description}</ReactMarkdown>
                </Markdown>
              )}
              {formik.touched.description && !!formik.errors.description && (
                <Typography color="#ef6a67" fontSize={12} sx={{ ml: '14px', mt: '4px' }}>
                  {formik.errors.description}
                </Typography>
              )}
            </DialogItem>
            <DialogItem>
              <Typography component="label" htmlFor="type">
                {t('collection.type')}
              </Typography>
              <Select
                id="theme"
                name="theme"
                value={formik.values.theme}
                onChange={formik.handleChange}
              >
                <MenuItem value={Collection.ALCOHOL}>{t('collection.alcohol')}</MenuItem>
                <MenuItem value={Collection.BOOKS}>{t('collection.books')}</MenuItem>
                <MenuItem value={Collection.MOVIES}>{t('collection.movies')}</MenuItem>
                <MenuItem value={Collection.HEROES}>{t('collection.heroes')}</MenuItem>
                <MenuItem value={Collection.CARS}>{t('collection.cars')}</MenuItem>
              </Select>
            </DialogItem>
            <DialogItem>
              <Typography component="label">{t('collection.image')}</Typography>
              <FileUploader formik={formik} />
              <Typography>{formik.values.image?.name}</Typography>
            </DialogItem>
            <DialogItem>
              <Typography component="label">{t('collection.additional')}</Typography>
              <AdditionalItemsWrapper>
                <AdditionalField formik={formik} type={AdditionalFields.STRING} />
                <AdditionalField formik={formik} type={AdditionalFields.NUMBER} />
                <AdditionalField formik={formik} type={AdditionalFields.TEXT} />
                <AdditionalField formik={formik} type={AdditionalFields.CHECKBOX} />
                <AdditionalField formik={formik} type={AdditionalFields.DATE} />
              </AdditionalItemsWrapper>
            </DialogItem>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" type="submit">
              {t('collection.create_btn')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
