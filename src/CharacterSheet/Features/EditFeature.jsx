import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  TextField,
} from '@material-ui/core';
import useEditContainer from '../../hooks/useEditContainer';
import ViewFeature from './ViewFeature';

function updateTags(tagsText) {
  return tagsText.replace(', ', ',').split(',');
}

function EditFeature({
  setEditMode,
  onSave,
  tags,
  name,
  longDesc,
  shortDesc,
  uses,
}) {
  const [editContainer, newVal, setNewVal] = useEditContainer({
    onCancel: () => setEditMode(false),
    onSave: onSave,
    value: {
      tags,
      name,
      longDesc,
      shortDesc,
      uses,
    },
  });

  function updateUses(numOfUses) {
    return Array(numOfUses).fill(false).map((use, i) => newVal.uses[i] || use); 
  }

  return editContainer({
    preview: (
      <ViewFeature {...newVal} />
    ),
    form: (
      <Box
        bgcolor="background.paper"
        p={1}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              onChange={(e) => setNewVal({ ...newVal, name: e.target.value })}
              value={newVal.name}
              variant="filled"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Uses"
              onChange={(e) => setNewVal({ ...newVal, uses: updateUses(parseInt(e.target.value, 10)) })}
              value={newVal.uses.length}
              variant="filled"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Short Desc."
              multiline
              onChange={(e) => setNewVal({ ...newVal, shortDesc: e.target.value })}
              value={newVal.shortDesc}
              variant="filled"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Long Desc."
              multiline
              onChange={(e) => setNewVal({ ...newVal, longDesc: e.target.value })}
              value={newVal.longDesc}
              variant="filled"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="tags"
              onChange={(e) => setNewVal({ ...newVal, tags: updateTags(e.target.value) })}
              value={newVal.tags.join(', ')}
              variant="filled"
            />
          </Grid>
        </Grid>
      </Box>
    )
  });
}

EditFeature.propTypes = {
  onSave: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  longDesc: PropTypes.string,
  shortDesc: PropTypes.string,
  uses: PropTypes.arrayOf(PropTypes.bool),
};

EditFeature.defaultProps = {
  name: '',
  longDesc: '',
  shortDesc: '',
  tags: [],
  uses: [],
};

export default EditFeature;
