import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
} from '@chakra-ui/react';

import { useFormik } from 'formik';
import validationSchema from './validations';

import { fetchRegister } from '../../../api';

import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Signup() {
  let navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const registerResponse = await fetchRegister({
          email: values.email,
          password: values.password,
        });
        login(registerResponse);
        navigate('/', { replace: true });
      } catch (e) {
        bag.setErrors({ general: e.response.data.message });
      }
    },
  });

  return (
    <div>
      <Flex align='center' justifyContent='center' w='full'>
        <Box pt='10'>
          <Box textAlign='center'>
            <Heading>Sign Up</Heading>
          </Box>
          <Box my='5'>
            {formik.errors.general && (
              <Alert status='error'>{formik.errors.general}</Alert>
            )}
          </Box>
          <Box my='5' textAlign='left'>
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input
                  name='email'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isInvalid={formik.touched.email && formik.errors.email}
                />
              </FormControl>

              <FormControl mt='4'>
                <FormLabel>Password</FormLabel>
                <Input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  type='password'
                  name='password'
                  isInvalid={formik.touched.password && formik.errors.password}
                />
              </FormControl>

              <FormControl mt='4'>
                <FormLabel>Password Confirm</FormLabel>
                <Input
                  type='password'
                  name='passwordConfirm'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirm}
                  isInvalid={
                    formik.touched.passwordConfirm &&
                    formik.errors.passwordConfirm
                  }
                />
              </FormControl>

              <Button mt='4' w='full' type='submit'>
                Sign Up
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Signup;
