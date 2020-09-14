import React from 'react';
import { useResetRecoilState, useRecoilValue } from 'recoil';
import { Popover } from '@material-ui/core';
import { popoverState } from '../state';

function GlobalPopover() {
  const props = useRecoilValue(popoverState);
  const reset = useResetRecoilState(popoverState);

  return (
    <Popover open={Boolean(props.anchorEl)} {...props} onClose={reset} />
  )
}

export default GlobalPopover;
