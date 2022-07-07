import { postProduct } from '../../../api';
import { useMutation, useQueryClient } from 'react-query';
import { message } from 'antd';
import { Formik, FieldArray } from 'formik';

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';

import validationSchema from './validations';

function NewProduct() {
  const queryClient = useQueryClient();
  const newProductMutation = useMutation(postProduct, {
    onSuccess: () => queryClient.invalidateQueries('admin:products'),
  });

  const handleSubmit = async (values, bag) => {
    message.loading({ content: 'Loading...', key: 'product_upload' });

    const newValues = {
      ...values,
      photos: JSON.stringify(values.photos),
    };
    newProductMutation.mutate(newValues, {
      onSuccess: () => {
        console.log('succes');

        message.success({
          content: 'Product succesfully upload.',
          key: 'product_upload',
          duration: 2,
        });
      },
    });
  };

  return (
    <div>
      <Text fontSize='2xl'>New Product</Text>

      <Formik
        initialValues={{
          title: 'deneme',
          description: 'Lorem picsum',
          price: '1000',
          photos: [],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          errors,
          touched,
          handleChange,
          handleBlur,
          values,
          isSubmitting,
        }) => (
          <>
            <Box>
              <Box my='5' textAlign='left'>
                <form onSubmit={handleSubmit}>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                      name='title'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      disabled={isSubmitting}
                      isInvalid={touched.title && errors.title}
                    />
                  </FormControl>
                  {touched.title && errors.title && (
                    <Text color='red'>{errors.title}</Text>
                  )}

                  <FormControl mt='4'>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      name='description'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      disabled={isSubmitting}
                      isInvalid={touched.description && errors.description}
                    />
                  </FormControl>
                  {touched.description && errors.description && (
                    <Text color='red'>{errors.description}</Text>
                  )}
                  <FormControl mt='4'>
                    <FormLabel>Price</FormLabel>
                    <Input
                      name='price'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.price}
                      disabled={isSubmitting}
                      isInvalid={touched.price && errors.price}
                    />
                  </FormControl>
                  {touched.price && errors.price && (
                    <Text color='red'>{errors.price}</Text>
                  )}
                  <FormControl mt='4'>
                    <FormLabel mb='-2'>Photos</FormLabel>
                    <FieldArray
                      name='photos'
                      render={(arraysHelpers) => (
                        <div>
                          {values.photos &&
                            values.photos.map((photos, index) => (
                              <div key={index}>
                                <Input
                                  name={`photos.${index}`}
                                  value={photos}
                                  disabled={isSubmitting}
                                  onChange={handleChange}
                                  w='3xl'
                                  mt='3'
                                />

                                <Button
                                  ml='4'
                                  type='button'
                                  colorScheme='red'
                                  onClick={() => arraysHelpers.remove(index)}
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                          <Button mt='5' onClick={() => arraysHelpers.push('')}>
                            Add a Photo
                          </Button>
                        </div>
                      )}
                    />
                  </FormControl>
                  <Button
                    mt='4'
                    w='full'
                    type='submit'
                    isLoading={isSubmitting}
                    colorScheme='green'
                  >
                    Save
                  </Button>
                </form>
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </div>
  );
}

export default NewProduct;
