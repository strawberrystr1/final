import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

const useValidationSchema = () => {
  const { t } = useTranslation();

  const validationSchema = yup.object({
    itemName: yup
      .string()
      .required(t('item.name_required') as string)
      .min(4, t('item.name_min') as string),
  });

  return validationSchema;
};

export default useValidationSchema;
