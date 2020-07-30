import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { characterState } from '../state';

function useCharacter(id) {
  /*
   * While there isn't much going on here yet,
   * this will eventually be where the interface
   * to crud characters should be defined
  **/
  const character = useRecoilValue(characterState(id));
  const res = useMemo(() => ({
    character,
  }), [character]);

  return res;
}

export default useCharacter;
