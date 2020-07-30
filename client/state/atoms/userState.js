import { atom } from 'recoil';
import { fetchUser } from '../../actions';

const userState = atom({
  key: 'userState',
  default: fetchUser(),
}); 

export default userState;
