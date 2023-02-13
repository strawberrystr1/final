import { FC } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

import { FormikType } from '../CreateCollectionPopup';

import { Wrapper } from './styled';

interface IProps {
  formik: FormikType;
}

export const FileUploader: FC<IProps> = ({ formik }) => {
  const { t } = useTranslation();

  const handleFile = (acceptedFiles: File[]) => {
    formik.setFieldValue('image', acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFile,
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
    },
  });

  return (
    <Wrapper {...getRootProps()}>
      <input {...getInputProps()} name="image" id="image" />
      {isDragActive ? (
        <Typography>{t('collection.dragging')}</Typography>
      ) : (
        <Typography>{t('collection.file')}</Typography>
      )}
    </Wrapper>
  );
};
