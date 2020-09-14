import React, { useRef, useState } from 'react';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import {
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { useCharacter } from '../hooks';
import { flagState, selectedCharacterState } from '../state';
import { Fa } from '../utils';

function CharacterBookHeader() {
  const [menu, setMenu] = useState(null);
  const setAddWidgetOpen = useSetRecoilState(flagState('addWidgetOpen'));
  const setEditPageOpen = useSetRecoilState(flagState('editPageOpen'));
  const [editing, setEditing] = useRecoilState(flagState('editMode'));
  const selectedCharacter = useRecoilValue(selectedCharacterState);
  const { character } = useCharacter(selectedCharacter);
  const { name } = character || {};
  const ref = useRef(null);

  return (
    <>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h6">{name}</Typography>
        </Grid>
        <Grid item>
          <IconButton edge="end" ref={ref} onClick={() => setMenu(ref.current)}>
            <Fa icon="cog" size="xs" transform="shrink-2" />
          </IconButton>
        </Grid>
      </Grid>
      <Menu open={Boolean(menu)} anchorEl={menu} onClose={() => setMenu(null)}>
        <MenuItem
          onClick={() => {
            setAddWidgetOpen(true);
            setMenu(null);
          }}
        >
          <ListItemIcon>
            <Fa icon="plus" />
          </ListItemIcon>
          Manage and Add Widgets
        </MenuItem>
        <MenuItem
          onClick={() => {
            setEditing(!editing);
            setMenu(null);
          }}
        >
          <ListItemIcon>
            <Fa icon="pencil" />
          </ListItemIcon>
          {
            editing
            ? 'Stop Arranging Widgets'
            : 'Arrange Widgets'
          }
        </MenuItem>
        <MenuItem
          onClick={() => {
            setMenu(null);
            setEditPageOpen(true);
          }}
        >
          <ListItemIcon>
            <Fa icon="file" />
          </ListItemIcon>
          Edit Page Details
        </MenuItem>
      </Menu>
    </>
  )
}

export default CharacterBookHeader;
