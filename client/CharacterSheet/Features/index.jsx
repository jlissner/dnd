import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import _isEqual from 'lodash/isEqual';
import _last from 'lodash/last';
import _map from 'lodash/map';
import {
  removeByIndex,
  replaceByIndex,
} from '../../utils';
import AddButton from '../../Form/AddButton';
import AdvancedTextSection from '../AdvancedTextSection';

const NEW_FEATURES_TEMPLATE = {
  name: '',
  uses: [],
  shortDesc: '',
  longDesc: '',
  tags: [],
};

function Features({
  features,
  updateCharacter,
}) {
  const [newFeatures, setNewFeatures] = useState(features);
  const addButtonDisabled = newFeatures.length > 0 ? !_last(newFeatures).name : false;

  useEffect(() => {
    setNewFeatures(features);
  }, [features]);

  function onAdd() {
    setNewFeatures([...newFeatures, NEW_FEATURES_TEMPLATE]);
  }

  function onDelete(index) {
    const updatedFeatures = removeByIndex(newFeatures, index);

    if (_isEqual(updatedFeatures, Features)) {
      setNewFeatures([...updatedFeatures]);
    } else {
      updateCharacter({ attributes: { features: updatedFeatures } });
    }
  }

  function onSave(updatedItem, index) {
    const updatedFeatures = replaceByIndex(newFeatures, updatedItem, index);

    updateCharacter({ attributes: { features: updatedFeatures } });
  }

  return (
    <Box
      bgcolor="rgba(0, 0, 0, 0.09)"
      borderRadius={4}
      p={2}
    >
      <Grid container spacing={2}>
        {_map(newFeatures, (feature, i) => (
          <Grid item xs={12} key={feature.name}>
            <AdvancedTextSection
              onDelete={() => onDelete(i)}
              onSave={(item) => onSave(item, i)}
              {...feature}
            />
          </Grid>
        ))}

        <Grid item xs={12}>
          <AddButton disabled={addButtonDisabled} onAdd={onAdd} />
        </Grid>

        <Grid item xs={12}>
          <Typography align="center" variant="h6">Features &amp; Traits</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

Features.propTypes = {
  features: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  updateCharacter: PropTypes.func.isRequired,
};

export default Features;
