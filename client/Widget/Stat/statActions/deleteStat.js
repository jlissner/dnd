import { deleteSmartValue } from '../../../actions';

async function deleteStat(stat) {
  await deleteSmartValue(stat.smartValueFk);

  return stat.idPk;
}

export default deleteStat;
