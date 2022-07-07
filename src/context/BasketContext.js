import { createContext, useState, useEffect, useContext } from 'react';

import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

const BasketContext = createContext();

const defaultBasket = JSON.parse(localStorage.getItem('basket')) || [];

const BasketProvider = ({ children }) => {
  const { user } = useAuth();

  const [products, setProducts] = useState(defaultBasket);
  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(products));
  }, [products]);

  const addToBasket = (data, findBasketItem) => {
    if (!user) {
      return;
    }
    if (!findBasketItem) {
      toast('Ürün sepete eklendi');
      return setProducts((products) => [...products, data]);
    }

    const filtered = products.filter((product) => {
      return product._id !== findBasketItem._id;
    });
    toast('Ürün sepetten çıkarıldı');
    setProducts(filtered);
  };

  const removeFromBasket = (item_id) => {
    const newBasket = products.filter((product) => {
      return item_id !== product._id;
    });
    toast('Ürün sepetten çıkarıldı');

    setProducts(newBasket);
  };

  const emptyBasket = () => {
    setProducts([]);
    toast('Siparişiniz Alınmıştır.');
  };

  const values = {
    products,
    setProducts,
    addToBasket,
    removeFromBasket,
    emptyBasket,
  };

  return (
    <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
  );
};

const useBasket = () => useContext(BasketContext);

export { useBasket, BasketProvider };
