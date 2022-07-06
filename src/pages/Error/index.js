import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import React from 'react';

function Error() {
  return (
    <div>
      <Alert status='error'>
        <AlertIcon />
        <AlertTitle>Error 404!</AlertTitle>
        <AlertDescription>This page was not found</AlertDescription>
      </Alert>
    </div>
  );
}

export default Error;
