import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { FormikItemCreate } from '../types/base';

import { prepareYupObject } from './mappers';

const useValidationSchema = (values: FormikItemCreate) => {
  const { t } = useTranslation();
  const schema = prepareYupObject(values, t);

  const validationSchema = yup.object().shape(schema);

  return validationSchema;
};

export default useValidationSchema;
