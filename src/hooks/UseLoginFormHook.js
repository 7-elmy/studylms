// hooks/useLoginForm.js
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../Redux/Apis/apiRequest';
// import { apiRequest } from '../../../Redux/Apis/apiRequest';

export function useLoginForm() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation schema
  const validationSchema = Yup.object().shape({
    login: Yup.string()
      .required(t('auth.validation.required'))
      .test('valid-email-or-phone', t('auth.validation.invalidLogin'), function (value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value)) return true;
        const egyptPhoneRegex = /^01[0-2|5]{1}[0-9]{8}$/;
        if (egyptPhoneRegex.test(value)) return true;
        return false;
      }),
    password: Yup.string()
      .min(6, t('auth.validation.passwordMinLength', { min: 6 }))
      .required(t('auth.validation.required')),
    rememberMe: Yup.boolean(),
  });

  const formik = useFormik({
    initialValues: { login: '', password: '', rememberMe: false },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const response = await dispatch(
          apiRequest({
            entity: 'login',
            url: 'api/login',
            method: 'POST',
            data: values,
            headers: { 'Accept-Language': localStorage.getItem('language') || 'en' },
          })
        ).unwrap();

        if (values.rememberMe) {
          localStorage.setItem('token', response.data.data.token);
          localStorage.setItem('name', response.data.data.name);
        }
        
        sessionStorage.setItem('token', response.data.data.token);
        sessionStorage.setItem('name', response.data.data.name);
        navigate('/class-specific-lesson');
      } catch (error) {
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    formik,
    showPassword,
    togglePasswordVisibility,
    isSubmitting,
    language: i18n.language,
    t
  };
}