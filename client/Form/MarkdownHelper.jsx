import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableRow,
} from '@material-ui/core';
import { Markdown } from '../Displays';
import { useGlobalState } from '../hooks';

const StyledCell = withStyles(() => ({
  root: {
    width: '50%',
  },
}))(TableCell);

const unorderedListExample = `
* Unordered List
* Unordered List
`;

const orderedListExample = `
1. ordered List
1. ordered List
`;

const tableExample = `
| Left Align | Center Align | Right Align |
|------------|:------------:|------------:|
| Cell       | Cell         | Cell        |
| Cell       | Cell         | Cell        |
| Cell       | Cell         | Cell        |
`;

function MarkdownHelper() {
  const [open, setOpen] = useGlobalState('markdownHelperOpen', true);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="md"
      fullWidth
    >
      <TableContainer>
        <Table size="small">
          <TableBody>
            <TableRow>
              <StyledCell># Header 1</StyledCell>
              <StyledCell><Markdown text="# Header 1" /></StyledCell>
            </TableRow>
            <TableRow>
              <StyledCell>## Header 2</StyledCell>
              <StyledCell><Markdown text="## Header 2" /></StyledCell>
            </TableRow>
            <TableRow>
              <StyledCell>### Header 3</StyledCell>
              <StyledCell><Markdown text="### Header 3" /></StyledCell>
            </TableRow>
            <TableRow>
              <StyledCell>#### Header 4</StyledCell>
              <StyledCell><Markdown text="#### Header 4" /></StyledCell>
            </TableRow>
            <TableRow>
              <StyledCell>##### Header 5</StyledCell>
              <StyledCell><Markdown text="##### Header 5" /></StyledCell>
            </TableRow>
            <TableRow>
              <StyledCell>###### Header 6</StyledCell>
              <StyledCell><Markdown text="###### Header 6" /></StyledCell>
            </TableRow>
            <TableRow>
              <StyledCell>[link to google](https://google.com)</StyledCell>
              <StyledCell><Markdown text="[link to google](https://google.com)" /></StyledCell>
            </TableRow>
            <TableRow>
              <StyledCell>*italics* or _italics_</StyledCell>
              <StyledCell><Markdown text="*italics*" /></StyledCell>
            </TableRow>
            <TableRow>
              <StyledCell>**bold** or __bold__</StyledCell>
              <StyledCell><Markdown text="**bold**" /></StyledCell>
            </TableRow>
            <TableRow>
              <StyledCell>***bold and italics*** or ___bold and italics___</StyledCell>
              <StyledCell><Markdown text="***bold and italics***" /></StyledCell>
            </TableRow>
            <TableRow>
              <StyledCell>~~strikethrough~~</StyledCell>
              <StyledCell><Markdown text="~~strikethrough~~" /></StyledCell>
            </TableRow>
            <TableRow>
              <StyledCell>
                <Markdown text={`\`\`\`${unorderedListExample}\`\`\``} />
              </StyledCell>
              <StyledCell><Markdown text={unorderedListExample} /></StyledCell>
            </TableRow>
            <TableRow>
              <StyledCell>
                <Markdown text={`\`\`\`${orderedListExample}\`\`\``} />
              </StyledCell>
              <StyledCell><Markdown text={orderedListExample} /></StyledCell>
            </TableRow>
            <TableRow>
              <StyledCell>
              <Markdown text={`\`\`\`${tableExample}\`\`\``}/>
              </StyledCell>
              <StyledCell><Markdown text={tableExample} /></StyledCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Dialog>
  );
}

export default MarkdownHelper;
