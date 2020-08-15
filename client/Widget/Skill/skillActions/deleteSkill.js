import { deleteSmartValue } from '../../../actions';

async function deleteSkill(skill) {
  await deleteSmartValue(skill.smartValueFk);

  return skill.idPk;
}

export default deleteSkill;
