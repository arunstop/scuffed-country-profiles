import { ReactNode } from "react";
export type ViewTypeTypes = "LIST" | "TILES" | "CARDS" | "TABLE";
export type ViewType = {
  type: ViewTypeTypes;
  icon: ReactNode;
};
export interface UiState {
  darkMode: boolean;
  viewType: {
    list: ViewType[];
    selected: string;
  };
  filtersOn: boolean;
}

export interface UiAction {
  toggleDarkMode: (darkMode: boolean) => void;
  setListView: (listViewType: string) => void;
  toggleFilters: (filtersOn: boolean) => void;
}

export type UiActionTypes =
  | {
      type: "TOGGLE_DARK_MODE";
      payload: { darkMode: boolean };
    }
  | {
      type: "SET_LIST_VIEW";
      payload: { listViewType: string };
    }
  | {
      type: "TOGGLE_FILTERS";
      payload: { filtersOn: boolean };
    };

export type UiContextProps = {
  state: UiState;
  action: UiAction;
};
