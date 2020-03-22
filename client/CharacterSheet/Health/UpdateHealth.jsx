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

    if (modifier === 0) {
      updateHealthHistory(newHistory);
      return;
    }

    setNewHistory({ newTotal, modifier })
    setSaving(true);

    updateCurrentHP(newTotal);
  }

  useEffect(() => {
    setNewVal('');
    setSaving(false);

    if (newHistory) {
      updateHealthHistory(newHistory);
      setNewHistory(null);
    }
  }, [hp]);

  return (
    <FormItem
      disabled={saving}
      value={newVal}
      setValue={setNewVal}
      onBlur={save}
      onEnter={save}
      label="Update"
    />
  )
}

UpdateHealth.propTypes = {
  hp: PropTypes.number.isRequired,
  updateCurrentHP: PropTypes.func.isRequired,
  updateHealthHistory: PropTypes.func.isRequired,
};

export default UpdateHealth;
