import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getNumericValue } from '../../utils';
import FormItem from '../../Form/FormItem';

function getChangeType(val) {
  const firstChar = val[0];

  if (firstChar === '-' || firstChar === '+') {
    return 'delta';
  }

  if (isNaN(parseInt(firstChar, 10))) {
    return 'invalid';
  }

  return 'set';
}

function getModifier(hp, val, type) {
  const parsedVal = getNumericValue(val);

  if (type === 'delta') {
    return parsedVal;
  }

  return parsedVal - hp;
}

function UpdateHealth({
  updateCurrentHP,
  updateHealthHistory,
  hp,
}) {
  const [newVal, setNewVal] = useState('');
  const [saving, setSaving] = useState(false);
  const [newHistory, setNewHistory] = useState(null);

  function save() {
    const type = getChangeType(newVal);

    if (type === 'invalid') {
      return;
    }

    const modifier = getModifier(hp, newVal, type);
    const newTotal = hp + modifier;

    setNewHistory({ newTotal, modifier })
    setSaving(true);

    updateCurrentHP(newTotal);
  }

  useEffect(() => {
    setNewVal('');
    setSaving(false);
    updateHealthHistory(newHistory);
  }, [hp]);

  return (
    <FormItem
      disabled={saving}
      label="Update HP"
      value={newVal}
      setValue={setNewVal}
      onBlur={save}
    />
  )
}

UpdateHealth.propTypes = {
  hp: PropTypes.number.isRequired,
  updateCurrentHP: PropTypes.func.isRequired,
  updateHealthHistory: PropTypes.func.isRequired,
};

export default UpdateHealth;
