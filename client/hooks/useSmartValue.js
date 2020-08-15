import { useMemo, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import _toNumber from 'lodash/toNumber';
import { updateSmartValue } from '../actions';
import { smartValueSelector, smartValueState } from '../state';

function getNewValue({ delta, isText }, newValue) {
  if (isText) {
    return newValue;
  }

  const trueNewValue = _toNumber(newValue) - delta;

  return String(trueNewValue);
}

function useSmartValue(id) {
  const smartValue = useRecoilValue(smartValueSelector(id));
  const setSmartValue = useSetRecoilState(smartValueState(id));
  const [saving, setSaving] = useState(false);

  return useMemo(() => ({
    smartValue,
    saving,
    updateValue: async (newValue) => {
      if (!newValue || newValue === smartValue.value) {
        return;
      }

      setSaving(true);

      try {
        const trueNewValue = getNewValue(smartValue, newValue);

        await updateSmartValue({ idPk: id, value: trueNewValue });

        setSmartValue(cur => ({ ...cur, value: trueNewValue }));
      } catch(error) {
        console.error(error);
      }

      setSaving(false);
    }
  }), [saving, smartValue, setSmartValue, id]);
}

export default useSmartValue;
