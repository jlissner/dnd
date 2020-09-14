import { withStyles } from '@material-ui/core/styles';
import { Checkbox } from '@material-ui/core';

const MarkdownCheckbox = withStyles((theme) => ({
  root: {
    marginBottom: 0,
    marginTop: 0,
    padding: 0,
  },
}))(Checkbox);

export default MarkdownCheckbox;