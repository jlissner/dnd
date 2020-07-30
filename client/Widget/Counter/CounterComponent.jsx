import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';
import { InputBase } from '@material-ui/core';
import { updateCounter } from '../../actions';
import { Simple } from '../../Displays';
import { widgetState } from '../../state';

function CounterComponent({ id }) {
  const ref = useRef(null);
  const [counter, setCounter] = useRecoilState(widgetState({ type: 'COUNTER', widgetId: id }));
  const [counterValue, setCounterValue] = useState(counter.value);

  useEffect(() => {
    setCounterValue(counter.value);
  }, [counter]);

  async function updateCounterValue(evt) {
    const { value } = evt.target;
    setCounterValue(value);

    try {
      const updatedCounter = await updateCounter({ idPk: id, value });

      setCounter(updatedCounter);
    } catch (error) {
      setCounterValue(counter.value);
    }
  }

  return (
    <Simple label={counter.title}>
      <InputBase
        inputRef={ref}
        disabled={counterValue !== counter.value}
        onFocus={() => ref.current.select()}
        onChange={updateCounterValue}
        value={counterValue}
        fullWidth
      />
    </Simple>
  )
}

CounterComponent.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CounterComponent;
