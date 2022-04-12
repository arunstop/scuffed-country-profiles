import { ReactNode, useEffect, useReducer } from "react";
import {
  ListViewTypes,
  UiAction,
  UiContextProps,
} from "../../data/types/UiTypes";
import {
  KEY_DARK_MODE,
  KEY_LIST_VIEWTYPE,
} from "../../helpers/localStorage/StorageKeys";
import {
  storageFind,
  storageSave,
} from "../../helpers/localStorage/LocalStorage";
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
        htmlTag.setAttribute("data-theme", "pastel");
        storageSave(KEY_DARK_MODE, JSON.stringify(darkMode));
      } else {
        htmlTag.classList.add("dark");
        htmlTag.setAttribute("data-theme", "night");
        storageSave(KEY_DARK_MODE, JSON.stringify(darkMode));
      }
    },
    setListView: (listViewType: ListViewTypes) => {
      uiDispatch({ type: "SET_LIST_VIEW", payload: { listViewType } });
      storageSave(KEY_LIST_VIEWTYPE, JSON.stringify(listViewType));
    },
  };
  const value: UiContextProps = {
    state: uiState,
    action: action,
  };

  useEffect(() => {
    const userDarkMode = storageFind(KEY_DARK_MODE);
    if (userDarkMode !== null) {
      action.toggleDarkMode(JSON.parse(userDarkMode));
    }
    // action.toggleDarkMode(JSON.parse());
  }, []);

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
};
