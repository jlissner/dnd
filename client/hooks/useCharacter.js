import { useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { createPage } from '../actions';
import { characterState } from '../state';

function useCharacter(id) {
  const [saving, setSaving] = useState(false);
  /*
   * While there isn't much going on here yet,
   * this will eventually be where the interface
   * to crud characters should be defined
  **/
  const [character, setCharacter] = useRecoilState(characterState(id));
  const res = useMemo(() => ({
    character,
    saving,
    createPage: async (title) => {
      setSaving(true);

      const newPage = await createPage({ title, characterId: character.idPk });

      setCharacter({
        ...character,
        pages: [
          ...character.pages,
          {
            idPk: newPage.idPk,
            title: newPage.title,
          },
        ],
      });
      setSaving(false);

    }
  }), [character, setCharacter, saving]);

  return res;
}

export default useCharacter;
