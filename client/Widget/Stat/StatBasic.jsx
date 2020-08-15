import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { InputBase } from '@material-ui/core';
import { Simple } from '../../Displays';
import useStat from './useStat';

function StatBasic({ handleOpen, notesRef, id }) {
  const inputRef = useRef(null);
  const {
    stat,
    saving,
    updateStatValue,
  } = useStat(id);
  const [statValue, setStatValue] = useState(stat.value);

  useEffect(() => {
    setStatValue(stat.value);
  }, [stat.value]);

  async function handleSave() {
    await updateStatValue(statValue);
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
    <Simple label={stat.name} handleOpen={handleOpen} notesRef={notesRef}>
      <InputBase
        inputProps={{ style: { textAlign: 'center' }}}
        inputRef={inputRef}
        disabled={saving}
        onKeyDown={handleKeyDown}
        onFocus={() => inputRef.current.select()}
        onBlur={handleSave}
        onChange={(evt) => setStatValue(evt.target.value)}
        value={statValue}
        fullWidth
      />
    </Simple>
  )
}

StatBasic.propTypes = {
  id: PropTypes.string.isRequired,
  handleOpen: PropTypes.func.isRequired,
  notesRef: PropTypes.shape().isRequired,
};

export default StatBasic;
