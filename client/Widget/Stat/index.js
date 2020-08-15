import StatComponent from './StatComponent';
import StatSkeleton from './StatSkeleton';
import StatForm from './StatForm';

const manifest = {
  type: 'Stat',
  Component: StatComponent,
  Fallback: StatSkeleton,
  Form: StatForm,
  defaultHeight: 5,
  defaultWidth: 1,
};

export default manifest;
