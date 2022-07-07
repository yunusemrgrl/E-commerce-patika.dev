import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
} from '@chakra-ui/react';

import { useQuery } from 'react-query';
import { fetchOrders } from '../../../api';
function Orders() {
  const { isLoading, isError, data, error } = useQuery(
    'admin:orders',
    fetchOrders,
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error {error.message}...</div>;
  }

  console.log(data);

  return (
    <div>
      <Text fontSize='2xl' p='5'>
        Orders
      </Text>

      <Table variant='simple'>
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Address</Th>
            <Th isNumeric>Product</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((product) => (
            <Tr key={product._id}>
              <Td>{product.user.email}</Td>
              <Td>{product.adress}</Td>
              <Td isNumeric>{product.items.length}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

export default Orders;
