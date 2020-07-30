import { bindActionCreators } from 'redux'
// import { charactersActions } from './characters';
import { pagesActions } from './pages';
// import { listsActions } from './lists';
import store from './store';

const actions = bindActionCreators({
  // ...charactersActions,
  // ...pagesActions,
  // ...listsActions,
}, store.dispatch);

export default actions;
