import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { InputBase } from '@material-ui/core';
import { Simple } from '../../Displays';
import useCounter from './useCounter';

function AttributeBasic({ id }) {
  const inputRef = useRef(null);
  const {
    counter,
    saving,
    updateCounterValue,
  } = useCounter(id);
  const [counterValue, setCounterValue] = useState(counter.value);

  useEffect(() => {
    setCounterValue(counter.value);
  }, [counter.value]);

  async function handleSave() {
    await updateCounterValue(counterValue);
  }

  async function handleKeyDown(evt) {
    if (evt.keyCode === 13) {
      await handleSave();

      process.nextTick(() => {
        inputRef.current.select();
      });
    }
  }

  return (
    <Simple label={counter.title}>
      <InputBase
        inputProps={{ style: { textAlign: 'center' }}}
        inputRef={inputRef}
        disabled={saving}
        onKeyDown={handleKeyDown}
        onFocus={() => inputRef.current.select()}
        onBlur={handleSave}
        onChange={(evt) => setCounterValue(evt.target.value)}
        value={counterValue}
        fullWidth
      />
    </Simple>
  )
}

AttributeBasic.propTypes = {
  id: PropTypes.string.isRequired,
};

export default AttributeBasic;
