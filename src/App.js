import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signin from './pages/Auth/Signin';
import Signup from './pages/Auth/Signup';
import ProductDetail from './pages/ProductDetail';
import Products from './pages/Products';
import Profile from './pages/Profile';
import Basket from './pages/Basket';
import Error from './pages/Error';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div id='content'>
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/product/:product_id' element={<ProductDetail />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/basket' element={<Basket />} />
          <Route path='*' element={<Error />} />
          <Route path='/profile/*' element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
