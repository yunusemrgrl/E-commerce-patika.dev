import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to='/'>E-commerce</Link>
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
        <Link to='/signin'>
          <Button colorScheme='pink'>Login</Button>
        </Link>
        <Link to='/signup'>
          <Button colorScheme='blue'>Register</Button>
        </Link>
      </div>
    </nav>
  );
}
export default Navbar;
