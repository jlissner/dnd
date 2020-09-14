import GlossaryComponent from './GlossaryComponent';
import GlossarySkeleton from './GlossarySkeleton';
import GlossaryForm from './GlossaryForm';

const manifest = {
  type: 'Glossary',
  Component: GlossaryComponent,
  Fallback: GlossarySkeleton,
  Form: GlossaryForm,
  defaultHeight: 5,
  defaultWidth: 1,
};

export default manifest;
