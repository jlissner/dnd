import { useMemo } from 'react';
import _map from 'lodash/map';
import { useRecoilCallback, useRecoilState } from 'recoil';
import { pageState, pageLayoutState, } from '../state';
import { updatePageLayout } from '../actions';

function usePage(pageId) {
  /*
   * [x] replace useSelectore with useRecoilState
   * [ } move all actions to actions file
   * [ ] make all actions work
   */
  const updateLayoutAtom = useRecoilCallback(({ set }) => (layout) => {
    set(pageLayoutState(layout.idPk), layout);
  });
  const [page, setPage] = useRecoilState(pageState(pageId));
  const res = useMemo(() => ({
    page,
    updateLayout: async (widgets) => {
      console.log('called??');
      const updatedLayouts = await updatePageLayout(pageId, widgets);

      _map(updatedLayouts, updateLayoutAtom);
    },
    updatePage: async (updatedPage) => {
      // TODO: add func to actually update the page

      setPage(updatedPage)
    }
  }), [pageId, page, updateLayoutAtom, setPage]);

  return res;
}

export default usePage;
