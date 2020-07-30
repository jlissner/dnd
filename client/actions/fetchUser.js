import axios from 'axios';

async function fetchUser() {
  const { data } = await axios.get('/user');

  return data || {};
}

export default fetchUser;
