import Card from '../../components/Card';
import { Box, Grid } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { fetchProductList } from '../../api';
function Products() {
  const { isLoading, error, data } = useQuery('products', fetchProductList);

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <Box ml='30' mr='30'>
      <Grid templateColumns='repeat(3, 1fr)' gap={20}>
        {data.map((product, index) => (
          <Card key={index} product={product} />
        ))}
      </Grid>
    </Box>
  );
}

export default Products;
