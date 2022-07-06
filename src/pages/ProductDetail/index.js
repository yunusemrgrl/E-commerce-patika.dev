import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchProduct } from '../../api';
import { Box, Text, Button } from '@chakra-ui/react';
import moment from 'moment';
import ImageGallery from 'react-image-gallery';
import { useBasket } from '../../context/BasketContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ProductDetail() {
  const { product_id } = useParams();

  const { addToBasket, products } = useBasket();

  const { isLoading, isError, data } = useQuery(['product', product_id], () =>
    fetchProduct(product_id),
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  const findBasketItem = products.find((item) => item._id === product_id);

  const images = data.photos.map((url) => ({ original: url }));
  return (
    <div>
      <ToastContainer />
      <Button
        colorScheme={findBasketItem ? 'pink' : 'green'}
        onClick={() => {
          addToBasket(data, findBasketItem);
        }}
      >
        {findBasketItem ? 'Remove From Basket' : 'Add to Basket'}
      </Button>
      <Text as='h2' fontSize='2xl'>
        {data.title}
      </Text>
      <Text>{moment(data.createdAt).format('DD/MM/YYYY')}</Text>
      <p>{data.description}</p>
      <Box m='10'>
        <ImageGallery items={images} />
      </Box>
    </div>
  );
}

export default ProductDetail;
