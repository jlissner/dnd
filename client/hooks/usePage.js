import { useMemo } from 'react';
import _cloneDeep from 'lodash/cloneDeep';
import _find from 'lodash/find';
import _map from 'lodash/map';
import _maxBy from 'lodash/maxBy';
import {
  useRecoilCallback,
  useRecoilState,
  useSetRecoilState,
  useRecoilValue,
} from 'recoil';
import widgets from '../Widget/widgets';
import {
  pageState,
  pageSelector,
  pageLayoutState,
  flagState,
  widgetTypesState,
} from '../state';
import {
  addWidgetToPage as addWidgetToPageAction,
  updatePageLayout,
} from '../actions';

function getCoordinates(widgetLayouts) {
  const heighest = _maxBy(widgetLayouts, ({ h, y }) => (h + y));
  const y = heighest ? (heighest.y + heighest.h + 1) : 0;

  return {
    y,
    x: 0,
  }
}

function usePage(pageId) {
  const updateLayoutsState = useRecoilCallback(({ set }) => (layouts) => {
    _map(layouts, layout => set(pageLayoutState(layout.idPk), layout));
  });
  const widgetTypes = useRecoilValue(widgetTypesState);
  const [page, setPage] = useRecoilState(pageState(pageId));
  const pageDetails = useRecoilValue(pageSelector(pageId));
  const setSavingPage = useSetRecoilState(flagState('savingPage'));
  const setAddWidgetOpen = useSetRecoilState(flagState('addWidgetOpen'));
  const handleNewLayout = useRecoilCallback(({ set }) => (layout) => {
    const updatedPage = _cloneDeep(page);

    updatedPage.layout.push(layout.idPk);

    set(pageLayoutState(layout.idPk), layout);
    setPage(updatedPage);
  });

  const res = useMemo(() => ({
    page,
    updateLayout: async (widgets) => {
      setSavingPage(true)
      const updatedLayouts = await updatePageLayout(pageId, widgets);

      updateLayoutsState(updatedLayouts);
      setSavingPage(false);
    },
    updatePage: async (updatedPage) => {
      setSavingPage(true);

      // TODO: add func to actually update the page
      setPage(updatedPage);

      setSavingPage(false);
    },
    addWidgetToPage: async (type, widgetId) => {
      setSavingPage(true);
      const widgetTypeFk = _find(widgetTypes, ['name', type]).idPk;

      const {
        defaultHeight = 0,
        defaultWidth = 0,
      } = widgets[type];

      const coordinates = getCoordinates(pageDetails.layout);
      const layoutData = {
        ...coordinates,
        height: defaultHeight,
        width: defaultWidth,
      }
      const newLayout = await addWidgetToPageAction(
        page.idPk,
        { widgetTypeFk: widgetTypeFk, idPk: widgetId },
        layoutData,
      );
      handleNewLayout(newLayout);

      setSavingPage(false);
      setAddWidgetOpen(false);
    }
  }), [
    handleNewLayout,
    page,
    pageId,
    pageDetails,
    setPage,
    setSavingPage,
    setAddWidgetOpen,
    updateLayoutsState,
    widgetTypes,
  ]);

  return res;
}

export default usePage;
