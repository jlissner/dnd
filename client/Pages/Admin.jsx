import React from 'react';
import {
  Grid,
} from '@material-ui/core';
import { EquipmentCategories } from '../Equipment';

function Admin() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <EquipmentCategories />
      </Grid>
    </Grid>
  )
}

export default Admin;
