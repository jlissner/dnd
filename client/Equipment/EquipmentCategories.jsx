import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import _get from 'lodash/get';
import _map from 'lodash/map';
import AddButton from '../Form/AddButton';
import { useGlobalState } from '../hooks';

function fetchCategories() {
  return axios.post('/query/graphql', {
    query: 'query { equipmentCategories { nodes { idPk name } } }',
  });
}

function EquipmentCategories() {
  const [categories, setCategories] = useGlobalState('equipmentCategories', []);

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories().then(({ data }) => {
        console.log({ data });
        const newCategories = _get(data, 'data.equipmentCategories.nodes', []);
        
        if (newCategories.length) {
          setCategories(newCategories);
        }
      }).catch(console.error);
    }
  }, [categories]);

  return (
    <List>
      {_map(categories, ({ idPk, name }) => (
        <ListItem key={idPk}>
          <ListItemText primary={name}/>
        </ListItem>
      ))}
      <ListItem>
        <ListItemSecondaryAction>
          
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  )
}

EquipmentCategories.propTypes = {};

export default EquipmentCategories;
