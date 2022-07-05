import React from 'react';
import Card from '../../components/Card';
import { Box, Button, Flex, Grid } from '@chakra-ui/react';
import { useInfiniteQuery } from 'react-query';
import { fetchProductList } from '../../api';
function Products() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery('products', fetchProductList, {
    getNextPageParam: (lastPage, allPages) => {
      const morePagesExist = lastPage.length === 12;
      if (!morePagesExist) {
        return;
      }
      return allPages.length + 1;
    },
  });

  if (status === 'loading') return 'Loading...';

  if (status === 'error') return 'An error has occurred: ' + error.message;
  return (
    <div>
      <Grid templateColumns='repeat(3, 1fr)' gap={20}>
        {/* {data.map((product, index) => (
          <Card key={index} product={product} />
        ))} */}
        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((product) => (
              <Box w='100%' key={product._id}>
                <Card product={product} />
              </Box>
            ))}
          </React.Fragment>
        ))}
      </Grid>
      <Flex mt='10' justifyContent='center'>
        <Button
          colorScheme='green'
          isLoading={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </Button>
      </Flex>
    </div>
  );
}

export default Products;
