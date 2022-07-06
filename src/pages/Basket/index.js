import {
  Alert,
  Box,
  Button,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { postOrder } from '../../api';
import { useBasket } from '../../context/BasketContext';

function Basket() {
  const { products, removeFromBasket, emptyBasket } = useBasket();

  const [address, setAddress] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const total = products.reduce((acc, obj) => acc + obj.price, 0);

  const handleSubmitForm = async () => {
    const productsId = products.map((product) => product._id);

    const input = {
      address,
      items: JSON.stringify(productsId),
    };
    try {
      await postOrder(input);
      emptyBasket();
      onClose();
      console.log('başarılı');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <ToastContainer />
      <Box p='5'>
        {products.length < 1 && (
          <Alert status='warning'>You have not any item in your basket</Alert>
        )}

        {products.length > 0 && (
          <>
            <ul>
              {products.map((product) => (
                <li key={product._id} style={{ marginBottom: 10 }}>
                  <Link to={`/product/${product._id}`}>
                    <Text fontSize='18' fontWeight='medium'>
                      {product.title} -{product.price}
                    </Text>
                    <Image
                      h='200'
                      src={product.photos[0]}
                      alt={product.title}
                      loading='lazy'
                    />
                  </Link>

                  <Button
                    mt='2'
                    size='sm'
                    colorScheme='pink'
                    onClick={() => removeFromBasket(product._id)}
                  >
                    Remove From Basket
                  </Button>
                </li>
              ))}
            </ul>
            <Box mt='10'>
              <Text fontSize='22'>Total: {total}</Text>
            </Box>

            <Button mt='2' colorScheme='facebook' onClick={onOpen}>
              Order
            </Button>

            <Modal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Order</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Adress</FormLabel>
                    <Textarea
                      ref={initialRef}
                      placeholder='Enter your Adress'
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme='blue'
                    mr={3}
                    onClick={() => handleSubmitForm()}
                  >
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )}
      </Box>
    </>
  );
}

export default Basket;
