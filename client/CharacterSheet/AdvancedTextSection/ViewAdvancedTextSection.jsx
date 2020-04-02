import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import {
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';
import _fill from 'lodash/fill';
import _map from 'lodash/map';
import { Badge, Markdown } from '../../Displays';
import Radio from '../../Form/Radio';
import { If, Rotate } from '../../utils';

const useStyles = makeStyles((theme) => ({
  expandButton: {
    padding: 0,
  },
  expandWrapper: {
    marginLeft: 'auto',
  },
  name: {
    marginRight: theme.spacing(0.5),
  },
}));

function ViewAdvancedTextSection({
  tags,
  name,
  longDesc,
  shortDesc,
  uses,
  setEditMode,
  onSave,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setSaving(false);
  }, [uses]);

  function save(val, index) {
    setSaving(true);

    const total = uses.length;
    const totalUsed = val ? index + 1 : index;
    const totalUnused = total - totalUsed;
    const newUsed = _fill(Array(totalUsed), true);
    const newUnused = _fill(Array(totalUnused), false);

    onSave({
      name,
      tags,
      longDesc,
      shortDesc,
      uses: [...newUsed, ...newUnused],
    })
  }

  return (
    <Box
      bgcolor="background.paper"
      border={1}
      borderColor="rgba(0, 0, 0, 0.42)"
      borderRadius={4}
      p={1}
    >
      <Grid alignItems="center" container wrap="nowrap">
        <Grid item>
          <Typography className={classes.name}><strong>{name}</strong></Typography>
        </Grid>
        {_map(uses, (use, i) => (
          <Grid item key={i}>
            <Radio
              checked={use}
              disabled={saving}
              onClick={(evt) => save(evt.target.checked, i)}
            />
          </Grid>
        ))}
        
        <Grid
          className={classes.expandWrapper}
          item
        >
          <If conditions={[longDesc, tags.length]}>
            <Rotate deg={expanded ? 180 : 0}>
              <IconButton onClick={() => setExpanded(!expanded)} className={classes.expandButton}>
                <ExpandMoreIcon />
              </IconButton>
            </Rotate>
          </If>
        </Grid>
      </Grid>

      <If conditions={[shortDesc, expanded]}>
        <Box mx={-1} my={1} >
          <Divider />
        </Box>
      </If>
      <Markdown text={shortDesc} />
      <Collapse in={expanded}>
        <>
          <Box bgcolor="rgba(0, 0, 0, 0.09)" my={1} p={1}>
            <Markdown text={longDesc} />
          </Box>
          {_map(tags, (tag) => (<Badge key={tag} text={tag}/>))}
        </>
      </Collapse>
    </Box>
  )
}

ViewAdvancedTextSection.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  longDesc: PropTypes.string,
  shortDesc: PropTypes.string,
  uses: PropTypes.arrayOf(PropTypes.bool),
};

ViewAdvancedTextSection.defaultProps = {
  name: '',
  longDesc: '',
  shortDesc: '',
  tags: [],
  uses: [],
};

export default ViewAdvancedTextSection;
