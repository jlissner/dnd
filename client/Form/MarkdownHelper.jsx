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
import Markdown from '../Markdown';
import { useGlobalState } from '../hooks';

const StyledCell = withStyles(() => ({
  root: {
    width: '50%',
  },
}))(TableCell);

const blockquoteExample = `
> This is an example

> of a block quote
`;

const unorderedListExample = `
* Unordered List
* Unordered List
`;

const orderedListExample = `
1. ordered List
1. ordered List
`;

const dividedText = `
Some text I want divided
--- 
Some text I want divided 
`

const tableExample = `
| Left Align | Center Align | Right Align |
|------------|:------------:|------------:|
| Cell       | Cell         | Cell        |
| Cell       | Cell         | Cell        |
| Cell       | Cell         | Cell        |
`;

const taskListExample = `
- [x] Talk to the guard
- [ ] Kill the goblins
- [ ] Get paid  
`;

function MarkdownHelper() {
  const [open, setOpen] = useGlobalState('markdownHelperOpen', false);

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
              <StyledCell>![fallback text](https://placebear.com/100/100 "hover text")</StyledCell>
              <StyledCell><Markdown text='![fallback text](https://placebear.com/100/100 "hover text")' /></StyledCell>
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
                <Markdown text={`\`\`\`plain${blockquoteExample}\`\`\``} />
              </StyledCell>
              <StyledCell><Markdown text={blockquoteExample} /></StyledCell>
            </TableRow>
            <TableRow>
              <StyledCell>
                <Markdown text={`\`\`\`plain${unorderedListExample}\`\`\``} />
              </StyledCell>
              <StyledCell><Markdown text={unorderedListExample} /></StyledCell>
            </TableRow>
            <TableRow>
              <StyledCell>
                <Markdown text={`\`\`\`plain${orderedListExample}\`\`\``} />
              </StyledCell>
              <StyledCell><Markdown text={orderedListExample} /></StyledCell>
            </TableRow>
            <TableRow>
              <StyledCell>
                <Markdown text={`\`\`\`plain${taskListExample}\`\`\``} />
              </StyledCell>
              <StyledCell><Markdown text={taskListExample} /></StyledCell>
            </TableRow>
            <TableRow>
              <StyledCell>
                <Markdown text={`\`\`\`plain${dividedText}\`\`\``} />
              </StyledCell>
              <StyledCell><Markdown text={dividedText} /></StyledCell>
            </TableRow>
            <TableRow>
              <StyledCell>
                <Markdown text={`\`\`\`plain${tableExample}\`\`\``}/>
              </StyledCell>
              <StyledCell><Markdown text={tableExample} /></StyledCell>
            </TableRow>
            <TableRow>
              <StyledCell>
                this text is `special`
              </StyledCell>
              <StyledCell><Markdown text="this text is `special`" /></StyledCell>
            </TableRow>
            <TableRow>
              <StyledCell>
                <pre>
                  <code>
                    
```
<br />
This is a special block
<br />
&nbsp;&nbsp;and the spacing
<br />
&nbsp;&nbsp;&nbsp;&nbsp;is preserved
<br />
```
                  </code>
                </pre>
              </StyledCell>
              <StyledCell><Markdown text={`
\`\`\`
This is a special block
  and the spacing
    is preserved
\`\`\`
`} /></StyledCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Dialog>
  );
}

export default MarkdownHelper;
