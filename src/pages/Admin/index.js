import React from 'react';
import { Route, Link, Navigate, Routes } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';

import { Box } from '@chakra-ui/react';
import './styles.css';
import Home from './Home';
import Orders from './Orders';
import Products from './Products';
import ProductDetail from './ProductDetail';
import NewProduct from './Products/newProduct';

function Admin() {
  const { user } = useAuth();
  return (
    <>
      {user?.role === 'user' && (
        <>
          <Navigate to='/' replace={true} />
        </>
      )}
      <div>
        <nav>
          <ul className='admin-menu'>
            <li>
              <Link to='/admin'>Home</Link>
            </li>
            <li>
              <Link to='/admin/orders'>Order</Link>
            </li>
            <li>
              <Link to='/admin/products'>Product</Link>
            </li>
          </ul>
        </nav>

        <Box mt='10' ml='2.5'>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/orders' element={<Orders />}></Route>
            <Route path='/products' element={<Products />}></Route>
            <Route path='/products/new' element={<NewProduct />}></Route>
            <Route
              path='/products/:product_id'
              element={<ProductDetail />}
            ></Route>
          </Routes>
        </Box>
      </div>
    </>
  );
}

export default Admin;
