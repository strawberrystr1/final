import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

const useValidationSchema = () => {
  const { t } = useTranslation();

  const validationSchema = yup.object({
    name: yup
      .string()
      .required(t('collection.name_required') as string)
      .min(6, t('collection.name_min') as string),
    description: yup
      .string()
      .required(t('collection.description_required') as string)
      .min(10, t('collection.description_min') as string),
  });

  return validationSchema;
};

export default useValidationSchema;
