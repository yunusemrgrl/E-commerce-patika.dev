import { Box, Image, Button } from '@chakra-ui/react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useBasket } from '../../context/BasketContext';

function Card({ product }) {
  const { addToBasket, products } = useBasket();
  const { user } = useAuth();

  const findBasketItem = products.find(
    (basket_item) => basket_item._id === product._id,
  );

  return (
    <Box borderWidth='1px' borderRadius='lg' overflow='hidden' p='3'>
      <Link to={`/product/${product._id}`}>
        <Image
          maxH='350'
          maxW='500'
          w='full'
          objectFit='cover'
          src={product.photos[0]}
          alt='Images'
          loading='lazy'
        />
        <Box>
          <Box display='flex' alignItems='baseline'>
            {moment(product.createdAt).format('DD/MM/YYYY')}
          </Box>
          <Box mt='1' fontWeight={'semibold'} as='h4' lineHeight={'tall'}>
            {product.title}
          </Box>
          <Box>{product.price}</Box>
        </Box>
      </Link>
      <Button
        colorScheme={!user ? 'green' : findBasketItem ? 'pink' : 'green'}
        variant='solid'
        onClick={() => addToBasket(product, findBasketItem)}
      >
        {!user
          ? 'Add To Basket'
          : findBasketItem
          ? 'Remove From Basket'
          : 'Add To Basket'}
      </Button>
    </Box>
  );
}

export default Card;
