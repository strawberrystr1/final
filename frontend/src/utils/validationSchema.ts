import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

const useValidationSchema = () => {
  const { t } = useTranslation();

  const validationSchema = yup.object({
    email: yup
      .string()
      .required(t('auth.email_required') as string)
      .email(t('auth.email_invalid') as string)
      .min(6, t('auth.email_min') as string),
    password: yup
      .string()
      .trim()
      .test('password', t('auth.password_whitespaces') as string, value => {
        return !/\s/.test(value as string);
      })
      .required(t('auth.password_required') as string)
      .test('password', t('auth.password_characters') as string, value => {
        return !/[\&@#$%\^\*]/.test(value as string);
      })
      .min(8, t('auth.password_min') as string),
    name: yup
      .string()
      .required(t('auth.name_required') as string)
      .test('only letters', t('auth.name_letters') as string, value => {
        return !/[\&!@#$%\^\*\)\(\[\]\{\}<>,/\/\+\\]/.test(value as string);
      })
      .min(3, t('auth.name_min') as string)
      .max(20, t('auth.name_max') as string),
  });

  return validationSchema;
};

export default useValidationSchema;
