import React from 'react';
import { RecoilRoot } from 'recoil'
import Markdown from './Markdown';
import GlobalPopover from '../client/GlobalPopover';

export default {
  title: 'Example/Markdown',
  component: Markdown,
};

const Template = (args) => (
  <RecoilRoot>
    <Markdown {...args} />
    <GlobalPopover />
  </RecoilRoot>
);

export const markdownStory = Template.bind({});

markdownStory.args = {
  text: (
`
this is a [] test

{attribute:attribute.value}

to see *how* **well** it works

- [] num 1
- [X] num 2

another test [x]
`
),
  dictionary: [
    { word: 'test', definition: 'this is a test'},
    { word: 'num', definition: 'a number'},
  ],
};
