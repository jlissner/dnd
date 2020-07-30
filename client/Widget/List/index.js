import {
  createList,
  deleteList,
  fetchList,
  fetchListsByCharacter,
  fetchListsByUser,
  updateList,
} from '../../actions';
import ListWidget from './ListWidget';
import ListSkeleton from './ListSkeleton';
import listForm from './listForm';

const manifest = {
  Component: ListWidget,
  Fallback: ListSkeleton,
  schema: listForm,
  fetch: fetchList,
  create: createList,
  remove: deleteList,
  update: updateList,
  byCharacter: fetchListsByCharacter,
  byUser: fetchListsByUser,
};

export default manifest;
