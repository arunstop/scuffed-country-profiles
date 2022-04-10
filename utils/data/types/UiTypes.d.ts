export type ListViewTypes = "LIST" | "TILES" | "CARDS";

export interface UiState {
  darkMode: boolean;
  listView: ListViewTypes;
}

export interface UiAction {
  toggleDarkMode: (darkMode: boolean) => void;
  setListView: (listViewType: ListViewTypes) => void;
}

export type UiActionTypes =
  | {
      type: "TOGGLE_DARK_MODE";
      payload: { darkMode: boolean };
    }
  | {
      type: "SET_LIST_VIEW";
      payload: { listViewType: ListViewTypes };
    };

export type UiContextProps = {
  state: UiState;
  action: UiAction;
};
