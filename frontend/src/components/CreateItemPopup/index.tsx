import { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';

import { additionalTypes } from '../../constants/base';
import { useCreateCollectionItemMutation } from '../../redux/api/collection';
import { FormikItemCreate, ITag } from '../../types/base';
import useValidationSchema from '../../utils/itemValidationSchema';
import {
  getFormikInitialValuesForAdditionalField,
  prepareFieldForRequest,
} from '../../utils/mappers';
import { DialogItem } from '../CreateCollectionPopup/styled';
import { CustomDialogTitle } from '../DialogTitle';
import { itemsAdditionalField } from '../ItemAdditionalFields';
import { TagsField } from '../TagsField';

interface IProps {
  additionalFields: Record<string, string[]>;
  collectionId: string;
}

export const CreateItemPopup: FC<IProps> = ({ additionalFields, collectionId }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [tags, setTags] = useState<ITag[]>([]);
  const [createItem, { data }] = useCreateCollectionItemMutation();

  const initialValues = useMemo(() => {
    return getFormikInitialValuesForAdditionalField(additionalFields, 'itemName');
  }, []);

  const validationSchema = useValidationSchema(initialValues);

  const handleSubmitForm = (values: FormikItemCreate) => {
    console.log(prepareFieldForRequest(values));
    createItem({ ...values, tags: tags.map(e => e.text), id: collectionId });
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmitForm,
    validationSchema,
  });

  const handleDialogClose = () => {
    setIsOpen(false);
    formik.resetForm();
  };

  const handleButtonClick = () => setIsOpen(prev => !prev);

  return (
    <>
      <Button onClick={handleButtonClick} variant="contained">
        <Typography sx={{ textTransform: 'none' }}>{t('item.create')}</Typography>
      </Button>
      <Dialog onClose={handleDialogClose} open={isOpen} maxWidth="lg" fullWidth={true}>
        <form onSubmit={formik.handleSubmit}>
          <CustomDialogTitle onClose={handleDialogClose}>
            <Typography fontSize={24}>{t('item.create')}</Typography>
          </CustomDialogTitle>
          <DialogContent dividers={true}>
            <DialogItem>
              <Typography component="label" htmlFor="name">
                {t('item.name')}
              </Typography>
              <TextField
                value={formik.values.name}
                name="itemName"
                id="itemName"
                onChange={formik.handleChange}
                placeholder={t('placeholder.item_name') || ''}
                error={formik.touched.itemName && !!formik.errors.itemName}
                helperText={formik.touched.itemName && formik.errors.itemName}
              />
            </DialogItem>
            <DialogItem>
              <Typography>{t('item.tags')}</Typography>
              <TagsField tags={tags} setTags={setTags} suggestion={[{ id: 'asd', text: 'asd' }]} />
            </DialogItem>
            <DialogItem>
              {additionalTypes.map(key => (
                <Box key={key}>
                  {additionalFields[key]?.map(field => {
                    const Component = itemsAdditionalField[key];
                    return <Component key={field} name={field} formik={formik} />;
                  })}
                </Box>
              ))}
            </DialogItem>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" type="submit">
              {t('item.create_btn')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
