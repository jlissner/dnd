import FeatureComponent from './FeatureComponent';
import FeatureSkeleton from './FeatureSkeleton';
import FeatureForm from './FeatureForm';

const manifest = {
  type: 'Feature',
  Component: FeatureComponent,
  Fallback: FeatureSkeleton,
  Form: FeatureForm,
  defaultHeight: 10,
  defaultWidth: 2,
};

export default manifest;
