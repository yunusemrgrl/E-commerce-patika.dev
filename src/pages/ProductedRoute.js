import { Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function ProductedRoute({ element: Element, ...rest }) {
  let navigate = useNavigate();
  const { loggedIn } = useAuth();
  console.log(loggedIn);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (loggedIn) {
          return <Element {...props} />;
        }
        return navigate('/', { replace: true });
      }}
    />
  );
}

export default ProductedRoute;
