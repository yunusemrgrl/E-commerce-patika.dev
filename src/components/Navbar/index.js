import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

import { useAuth } from '../../context/AuthContext';
import { useBasket } from '../../context/BasketContext';

function Navbar() {
  const { loggedIn, user } = useAuth();
  const { products } = useBasket();

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to='/'>eCommerce</Link>
        </div>
      </div>
      <div>
        <ul className={styles.categories}>
          <li>
            <Link to='/'>Products</Link>
          </li>
        </ul>
      </div>

      <div className={styles.right}>
        {!loggedIn && (
          <>
            <Link to='/signin'>
              <Button colorScheme='pink'>Login</Button>
            </Link>
            <Link to='/signup'>
              <Button colorScheme='blue'>Register</Button>
            </Link>
          </>
        )}

        {loggedIn && (
          <>
            {products.length > 0 && (
              <Link to='/basket'>
                <Button colorScheme='pink' variant='outline'>
                  Basket ({products.length})
                </Button>
              </Link>
            )}

            {user?.role === 'admin' && (
              <Link to='/admin'>
                <Button colorScheme='pink' variant='ghost'>
                  Admin
                </Button>
              </Link>
            )}

            <Link to='/profile'>
              <Button>Profile</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
