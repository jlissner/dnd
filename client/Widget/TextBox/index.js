import TextBoxWrapper from './TextBoxWrapper';
import TextBoxSkeleton from './TextBoxSkeleton';
import TextBoxForm from './TextBoxForm';

const manifest = {
  type: 'TextBox',
  display: 'name',
  Component: TextBoxWrapper,
  Fallback: TextBoxSkeleton,
  Form: TextBoxForm,
  defaultHeight: 10,
  defaultWidth: 2,
};

export default manifest;
