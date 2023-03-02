import { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';
import { Box, Dialog, DialogActions, DialogContent, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';

import { additionalTypes } from '../../constants/base';
import { useCreateCollectionItemMutation } from '../../redux/api/collection';
import { useUpdateItemMutation } from '../../redux/api/item';
import { useGetAllTagsQuery } from '../../redux/api/tags';
import { FormikItemCreate, IFieldTag } from '../../types/base';
import { IItemWithAllFields } from '../../types/item';
import useValidationSchema from '../../utils/itemValidationSchema';
import {
  getFormikInitialValuesForAdditionalField,
  mapTags,
  prepareFieldForRequest,
} from '../../utils/mappers';
import { DialogItem } from '../CreateCollectionPopup/styled';
import { CustomDialogTitle } from '../DialogTitle';
import { itemsAdditionalField } from '../ItemAdditionalFields';
import { TagsField } from '../TagsField';

interface IProps {
  additionalFields: Record<string, string[]>;
  collectionId: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  currentItem?: IItemWithAllFields;
}

export const CreateItemPopup: FC<IProps> = ({
  additionalFields,
  collectionId,
  isOpen,
  setIsOpen,
  currentItem,
}) => {
  const { t } = useTranslation();
  const [tags, setTags] = useState<IFieldTag[]>(() =>
    currentItem ? mapTags(currentItem.tags) : []
  );
  const [createItem, { isSuccess, isLoading }] = useCreateCollectionItemMutation();
  const [updateItem, { isSuccess: isUpdateSuccess, isLoading: isUpdateLoading }] =
    useUpdateItemMutation();
  const { data: suggestions, refetch } = useGetAllTagsQuery(null, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  const initialValues = useMemo(() => {
    return getFormikInitialValuesForAdditionalField(additionalFields, ['itemName'], currentItem);
  }, []);

  const validationSchema = useValidationSchema(initialValues);

  const handleSubmitForm = (values: FormikItemCreate) => {
    const payloadValues = prepareFieldForRequest(values, additionalFields);
    if (currentItem) {
      updateItem({
        ...payloadValues,
        itemName: values.itemName as string,
        tags: tags.map(e => e.text),
        collectionId: collectionId,
        itemId: `${currentItem.id}`,
      });
    } else {
      createItem({
        ...payloadValues,
        itemName: values.itemName as string,
        tags: tags.map(e => e.text),
        id: collectionId,
      });
    }
    refetch();
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmitForm,
    validationSchema,
  });

  useEffect(() => {
    if (isSuccess || isUpdateSuccess) {
      setIsOpen(false);
      formik.resetForm();
      setTags([]);
    }
  }, [isSuccess, isUpdateSuccess]);

  const handleDialogClose = () => {
    setIsOpen(false);
    formik.resetForm();
  };

  return (
    <Box>
      <Dialog onClose={handleDialogClose} open={isOpen} maxWidth="lg" fullWidth={true}>
        <form onSubmit={formik.handleSubmit}>
          <CustomDialogTitle onClose={handleDialogClose}>
            <Typography fontSize={24}>
              {currentItem ? t('item.update') : t('item.create')}
            </Typography>
          </CustomDialogTitle>
          <DialogContent dividers={true}>
            <DialogItem>
              <Typography component="label" htmlFor="name">
                {t('item.name')}
              </Typography>
              <TextField
                value={formik.values.itemName}
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
              <TagsField tags={tags} setTags={setTags} suggestion={suggestions || []} />
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
            <LoadingButton loading={isUpdateLoading || isLoading} variant="contained" type="submit">
              {currentItem ? t('item.update_btn') : t('item.create_btn')}
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};
