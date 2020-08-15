import axios from 'axios';

async function fetchSkillsByCharacter(characterId) {
  const query = `
    query {
      character(idPk: "${characterId}") {
        skills {
          nodes {
            idPk
          }
        }
      }
    }
  `;

  const { data } = await axios.post('/query/graphql', { query });
  const skills = data.data.character.skills.nodes;
  
  return skills.map(({ idPk }) => idPk);
}

export default fetchSkillsByCharacter;
