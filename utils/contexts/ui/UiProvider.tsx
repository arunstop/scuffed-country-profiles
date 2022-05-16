import { ReactNode, useEffect, useReducer } from "react";
import { UiAction, UiContextProps } from "../../data/types/UiTypes";
import {
  storageFind,
  storageSave,
} from "../../helpers/localStorage/LocalStorage";
import {
  KEY_DARK_MODE,
  KEY_LIST_VIEWTYPE as KEY_LIST_VIEW_TYPE,
} from "../../helpers/localStorage/StorageKeys";
import { UiContext } from "./UiContext";
import { INIT_UI_STATE } from "./UiInitializers";
import { uiReducer } from "./UiReducer";

export const UiProvider = ({ children }: { children: ReactNode }) => {
  // reducer
  const [uiState, uiDispatch] = useReducer(uiReducer, { ...INIT_UI_STATE });

  const action: UiAction = {
    toggleDarkMode: (darkMode: boolean) => {
      // change state
      uiDispatch({ type: "TOGGLE_DARK_MODE", payload: { darkMode } });
      const htmlTag = document.documentElement;
      // change the ui
      if (darkMode === false) {
        htmlTag.classList.remove("dark");
        htmlTag.setAttribute("data-theme", "emerald");
        storageSave(KEY_DARK_MODE, JSON.stringify(darkMode));
      } else {
        htmlTag.classList.add("dark");
        htmlTag.setAttribute("data-theme", "night");
        storageSave(KEY_DARK_MODE, JSON.stringify(darkMode));
      }
    },
    setListView: (listViewType: string) => {
      uiDispatch({ type: "SET_LIST_VIEW", payload: { listViewType } });
      storageSave(KEY_LIST_VIEW_TYPE, JSON.stringify(listViewType));
    },
    toggleFilters: (filtersOn: boolean) => {
      uiDispatch({ type: "TOGGLE_FILTERS", payload: { filtersOn: filtersOn } });
    },
  };
  const value: UiContextProps = {
    state: uiState,
    action: action,
  };

  useEffect(() => {
    const userDarkMode = JSON.parse(storageFind(KEY_DARK_MODE));
    // if not initialized in storage
    if (userDarkMode === null) {
      // set depends on system
      action.toggleDarkMode(!!userDarkMode);
    }
    // if initialized
    else {
      // set depends on the storage
      action.toggleDarkMode(userDarkMode);
    }
    const userListViewType = JSON.parse(storageFind(KEY_LIST_VIEW_TYPE));
    // if not yet initialized
    if (!userListViewType) {
      action.setListView(uiState.viewType.selected);
    } else if (userListViewType !== uiState.viewType.selected) {
      action.setListView(userListViewType);
    }
    // mainContainerOnScroll();
    // action.toggleDarkMode(JSON.parse());
  }, []);

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
};
