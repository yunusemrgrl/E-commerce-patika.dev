import { useMemo } from 'react';

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchProductList, deleteProduct } from '../../../api';
import { Button, Flex, Text } from '@chakra-ui/react';
import { Table, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
function Products() {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery(
    'admin:products',
    fetchProductList,
  );

  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => queryClient.invalidateQueries('admin:products'),
  });

  const columns = useMemo(() => {
    return [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
      },
      {
        title: 'Action',
        key: 'action',
        render: (record) => (
          <>
            <Link to={`/admin/products/${record._id}`}>Edit</Link>

            <Popconfirm
              title='Are you sure'
              onConfirm={() => {
                deleteMutation.mutate(record._id, {
                  onSuccess: () => {},
                });
              }}
              onCancel={() => console.log('iptal edildi')}
              okText='Yes'
              cancelText='No'
              placement='left'
            >
              <a href='/#' style={{ marginLeft: 20 }}>
                Delete
              </a>
            </Popconfirm>
          </>
        ),
      },
    ];
  }, [deleteMutation]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error {error.message}</div>;
  }
  return (
    <div>
      <Flex justifyContent='space-between' alignItems='center'>
        <Text fontSize='2xl' p='5'>
          Products
        </Text>

        <Link to='/admin/products/new'>
          <Button colorScheme='green'>New + </Button>
        </Link>
      </Flex>

      <Table dataSource={data} columns={columns} rowKey='_id'></Table>
    </div>
  );
}

export default Products;
