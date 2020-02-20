import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import _find from 'lodash/find';
import _map from 'lodash/map';
import _reduce from 'lodash/reduce';
import _toUpper from 'lodash/toUpper';
import getNumberPrefix from '../../utils/getNumericPrefix';
import Radio from '../../Form/Radio';
import Feature from '../Features/Feature';

const BASE_SAVE_DC = 8;

function getSave(type, attributes, proficiencyBonus) {
  const  [attr, save] = type.split(':');
  const { modifier } = _find(attributes, { abbv: attr });
  const dc = BASE_SAVE_DC + proficiencyBonus + modifier;

  return `${_toUpper(save)}${dc}`
}

function getModifier(atk, character) {
  const { modType, modifier, proficient } = atk;
  const { attributes, proficiencyBonus } = character

  const something = _reduce(modType, (res, type) => {
    const attr = _find(attributes, { abbv: type });

    if (attr) {
      const bonus = proficient ? proficiencyBonus : 0;
      const total = modifier + attr.modifier + bonus;
      const mod = `${getNumberPrefix(total)}${total}`;

      return `${res}, ${mod}`;
    }

    const save = getSave(type, attributes, proficiencyBonus);

    return `${res}, ${save}`
  }, '');

  return something.substring(2);
}

function Attack({
  attack,
  character,
}) {
  const {
    dmg,
    dmgType,
    name,
    quantity,
    uses,
    range,
  } = attack;

  return (
    <Box p={1}>
      <Feature
        onSave={() => alert('make me work')}
        tags={[]}
        name={`${quantity > 1 ? `${quantity}x ` : ''}${name}`}
        longDesc={''}
        shortDesc={`${range ? `range: ${range} | ` : ''}${getModifier(attack, character)} | ${dmg} | ${dmgType}`}
        uses={uses}
      />
      {/* <Box */}
      {/* > */}
      {/*   <Typography variant="caption">{dmgType}</Typography> */}
      {/* </Box> */}
      {/* <Grid container spacing={2}> */}
      {/*   <Grid item> */}
      {/*     <Typography><strong>{quantity > 1 ? `${quantity}x ` : ''}{name}</strong></Typography> */}
      {/*   </Grid> */}
      {/*   <Grid item> */}
      {/*     <Typography>{getModifier(attack, character)}</Typography> */}
      {/*   </Grid> */}
      {/*   <Grid item> */}
      {/*     <Typography>{dmg}</Typography> */}
      {/*   </Grid> */}
      {/* </Grid> */}
      {/* <Box> */}
      {/*   {_map(uses, (use, i) => ( */}
      {/*     <Radio key={i} checked={use} /> */}
      {/*   ))} */}
      {/* </Box> */}
    </Box>
  )
}

Attack.propTypes = {
  attack: PropTypes.shape().isRequired,
  character: PropTypes.shape().isRequired,
};

export default Attack;
