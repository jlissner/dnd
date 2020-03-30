import { useEffect } from 'react';
import axios from 'axios';
import useGlobalState from './useGlobalState';

function useUser(initUser) {
  const [user, setUser] = useGlobalState('user');

  useEffect(() => {
    if (initUser) {
      console.log('here');
      axios.get('/user').then(({ data }) => {
        setUser(data || {});
      });
    }
  }, [initUser, setUser]);

  return user;
}

export default useUser;
