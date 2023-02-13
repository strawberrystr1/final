import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { Avatar, IconButton, Typography } from '@mui/material';
import capitalize from '@mui/material/utils/capitalize';
import { useFormik } from 'formik';

import routes from '../../constants/routes';
import { useLoginMutation, useRegisterMutation } from '../../redux/api/auth';
import useValidationSchema from '../../utils/validationSchema';

import { ButtonsWrapper, Form, StyledField } from './styled';

export const AuthForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();
  const validationSchema = useValidationSchema();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [loginUser, { isLoading: loginLoading }] = useLoginMutation();

  const isRegisterPage = location.pathname.match(/up/g);

  const formikInitialFields = {
    email: '',
    password: '',
  };

  const handleFormSubmit = () => {};

  const formik = useFormik<{ [key: string]: string }>({
    initialValues: isRegisterPage ? { name: '', ...formikInitialFields } : formikInitialFields,
    validationSchema: isRegisterPage ? validationSchema : validationSchema.omit(['name']),
    onSubmit: handleFormSubmit,
  });

  const handleClickShowPassword = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleButtonClick = async () => {
    if (isRegisterPage) {
      await registerUser({
        name: formik.values.name,
        email: formik.values.email,
        password: formik.values.password,
      })
        .unwrap()
        .then(() => {
          navigate('/');
        });
    } else {
      await loginUser({
        email: formik.values.email,
        password: formik.values.password,
      })
        .unwrap()
        .then(() => {
          navigate('/');
        });
    }
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Avatar alt="auth-logo" color="primary" sx={{ bgcolor: 'rgb(185, 172, 190)', m: '10px 0' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography fontSize={26} variant="h5">
        {isRegisterPage ? t('auth.title_sup') : t('auth.title_sin')}
      </Typography>
      {Object.keys(formik.initialValues).map(field => {
        if (field === 'password') {
          return (
            <StyledField
              key={field}
              id={field}
              name={field}
              label={capitalize(t(`auth.${field}`))}
              autoComplete="on"
              type={showPassword ? 'text' : 'password'}
              value={formik.values[field]}
              onChange={formik.handleChange}
              error={formik.touched[field] && Boolean(formik.errors[field])}
              helperText={formik.touched[field] && formik.errors[field]}
              InputProps={{
                endAdornment: (
                  <IconButton
                    sx={{ position: 'absolute', right: '12px', top: '8px' }}
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
          );
        } else {
          return (
            <StyledField
              key={field}
              id={field}
              name={field}
              label={capitalize(t(`auth.${field}`))}
              value={formik.values[field]}
              onChange={formik.handleChange}
              error={formik.touched[field] && Boolean(formik.errors[field])}
              helperText={formik.touched[field] && formik.errors[field]}
            />
          );
        }
      })}
      <ButtonsWrapper>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={isLoading || loginLoading}
          onClick={handleButtonClick}
        >
          {isRegisterPage ? t('auth.title_sup') : t('auth.title_sin')}
        </LoadingButton>
        <Link to={isRegisterPage ? routes.SIGNIN : routes.SIGNUP}>
          <Typography>
            {isRegisterPage ? t('auth.change_btn_sup') : t('auth.change_btn_sin')}
          </Typography>
        </Link>
      </ButtonsWrapper>
    </Form>
  );
};
