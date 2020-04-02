import { useCallback, useEffect } from 'react';
import axios from 'axios';
import useGlobalState from './useGlobalState';

function useUser(initUser) {
  const [user, setUser] = useGlobalState('user');
  const fetchUser = useCallback(async () => {
    const { data } = await axios.get('/user');

    setUser(data || {});
  }, [setUser]);

  useEffect(() => {
    if (initUser) {
      fetchUser()
    }
  }, [initUser, fetchUser]);

  return { user, fetchUser };
}

export default useUser;
