import {
  createCounter,
  deleteCounter,
  fetchCounter,
  fetchCountersByCharacter,
  fetchCountersByUser,
  updateCounter,
} from '../../actions';
import CounterComponent from './CounterComponent';
import CounterSkeleton from './CounterSkeleton';
import counterForm from './counterForm';

const manifest = {
  Component: CounterComponent,
  Fallback: CounterSkeleton,
  schema: counterForm,
  fetch: fetchCounter,
  create: createCounter,
  remove: deleteCounter,
  update: updateCounter,
  byCharacter: fetchCountersByCharacter,
  byUser: fetchCountersByUser,
};

export default manifest;
