import { ReactNode, useReducer } from "react";
import { UiAction, UiContextProps } from "../../data/types/UiTypes";
import { UiContext } from "./UiContext";
import { INIT_UI_STATE } from "./UiInitializers";
import { uiReducer } from "./UiReducer";

export const UiProvider = ({ children }: { children: ReactNode }) => {
  // reducer
  const [uiState, uiDispatch] = useReducer(uiReducer, { ...INIT_UI_STATE });

  const action: UiAction = {
    toggleDarkMode: (darkMode: boolean) => {
      uiDispatch({ type: "TOGGLE_DARK_MODE", payload: { darkMode } });
    },
  };
  const value: UiContextProps = {
    state: uiState,
    action: action,
  };

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
};
