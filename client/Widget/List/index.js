import ListWidget from './ListWidget';
import ListSkeleton from './ListSkeleton';
import ListForm from './ListForm';

const manifest = {
  type: 'List',
  Component: ListWidget,
  Fallback: ListSkeleton,
  Form: ListForm,
  defaultHeight: 10,
  defaultWidth: 2,
};

export default manifest;
