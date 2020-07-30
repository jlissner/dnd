import axios from 'axios';
import {
  GET_CHARACTER,
  GET_CHARACTER_SUCCESS,
  GET_CHARACTER_FAILURE,
} from './charactersConstants';

function getCharacter(idPk) {
  return async (dispatch) => {
    dispatch({ type: GET_CHARACTER, payload: { idPk } });

    try {
      const query = `
        query {
          character(idPk: "${idPk}") {
            idPk
            attributes
            name
            notes
            pages:characterPages {
              nodes {
                idPk
                title
              }
            }
          }
        }
      `;
      const res = await axios.post('/query/graphql', { query });
      const { character } = res.data.data;

      character.pages = character.pages.nodes;

      dispatch({ type: GET_CHARACTER_SUCCESS, payload: character }); 
    } catch (error) {
      dispatch({ type: GET_CHARACTER_FAILURE, payload: { idPk, error } });
    }
  }
}

const characterActions = {
  getCharacter,
};

export default characterActions;
