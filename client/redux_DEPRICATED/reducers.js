import { combineReducers } from 'redux';
import { charactersReducer } from './characters';
import { pagesReducer } from './pages';
// import { listsReducer } from './lists';

const reducers = combineReducers({
  // characters: charactersReducer,
  // pages: pagesReducer,
  // lists: listsReducer,
  placeholder: (state = {}) => state,
});

export default reducers;
