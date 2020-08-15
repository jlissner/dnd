import AttributeComponent from './AttributeComponent';
import AttributeSkeleton from './AttributeSkeleton';
import AttributeForm from './AttributeForm';

const manifest = {
  type: 'Attribute',
  Component: AttributeComponent,
  Fallback: AttributeSkeleton,
  Form: AttributeForm,
  defaultHeight: 5,
  defaultWidth: 1,
};

export default manifest;
