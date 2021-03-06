import { useAuth } from '../../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Text } from '@chakra-ui/react';
function Profile() {
  let navigate = useNavigate();
  const { user, logout, loggedIn } = useAuth();

  const handleLogout = async () => {
    logout(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    <>
      {!loggedIn && (
        <>
          <Navigate to='/' replace={true} />
        </>
      )}

      {loggedIn && (
        <>
          <div>
            <Text fontSize='2xl'>Profile</Text>
            <code>{JSON.stringify(user)}</code>
            <br />
            <br />
            <Button colorScheme='pink' variant='solid' onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
