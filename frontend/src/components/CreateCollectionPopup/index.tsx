import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
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
import { FormikProps, useFormik } from 'formik';

import { AdditionalFields, Collection } from '../../constants/collection';
import { useCreateMutation, useUpdateCollectionMutation } from '../../redux/api/collection';
import { IUserCollectionsResponse } from '../../types/collection';
import { ICreateCollectionForm } from '../../types/formik';
import useValidationSchema from '../../utils/collectionValidationSchema';
import { createOrUpdateCollection } from '../../utils/formik';
import { getCreateCollectionFormikInitalState } from '../../utils/formikInitialState';
import { getFieldName } from '../../utils/helpers';
import { AdditionalField } from '../AdditionalField';
import { CustomDialogTitle } from '../DialogTitle';
import { FileUploader } from '../FileUploader';

import { AdditionalItemsWrapper, DialogItem, Markdown } from './styled';

export type FormikType = FormikProps<ICreateCollectionForm>;

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  currentCollection?: IUserCollectionsResponse;
}

export const CreateCollectionPopup: FC<IProps> = ({ isOpen, currentCollection, setIsOpen }) => {
  const [isEdditing, setIsEdditing] = useState(false);
  const textArea = useRef<HTMLTextAreaElement>(null);
  const validationSchema = useValidationSchema();
  const { t } = useTranslation();
  const [createCollection, { isSuccess }] = useCreateMutation();
  const [updateCollection, { isSuccess: isSuccessUpdate }] = useUpdateCollectionMutation();

  const handleSubmitForm = (values: ICreateCollectionForm) => {
    if (currentCollection) {
      createOrUpdateCollection(values, {
        callback: updateCollection,
        type: 'update',
        id: currentCollection.id,
        image: currentCollection.image,
      });
    } else {
      createOrUpdateCollection(values, {
        callback: createCollection,
        type: 'create',
      });
    }
  };

  const formik = useFormik({
    initialValues: getCreateCollectionFormikInitalState(currentCollection),
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

  useEffect(() => {
    if (isSuccess || isSuccessUpdate) {
      formik.resetForm();
      setIsOpen(false);
    }
  }, [isSuccess, isSuccessUpdate]);

  const handleDialogClose = () => {
    setIsOpen(false);
    formik.resetForm();
  };

  const handleTextAreaFocus = () => setIsEdditing(true);
  const handleTextAreaBlur = () => setIsEdditing(false);

  return (
    <>
      <Dialog onClose={handleDialogClose} open={isOpen} maxWidth="lg" fullWidth={true}>
        <form onSubmit={formik.handleSubmit}>
          <CustomDialogTitle onClose={handleDialogClose}>
            <Typography fontSize={24}>
              {currentCollection ? t('collection.update') : t('collection.create')}
            </Typography>
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
                {Object.values(AdditionalFields).map(field => (
                  <AdditionalField
                    formik={formik}
                    initialAmount={currentCollection?.[getFieldName(field)].length || 1}
                    type={field}
                    key={field}
                  />
                ))}
              </AdditionalItemsWrapper>
            </DialogItem>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" type="submit">
              {currentCollection ? t('collection.update') : t('collection.create_btn')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
