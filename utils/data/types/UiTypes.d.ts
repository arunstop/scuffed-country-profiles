export type ListViewTypes = "LIST" | "TILES" | "CARDS" | "TABLE";

export interface UiState {
  darkMode: boolean;
  listView: {
    typeList: ListViewTypes[];
    selected: string;
  };
}

export interface UiAction {
  toggleDarkMode: (darkMode: boolean) => void;
  setListView: (listViewType: string) => void;
}

export type UiActionTypes =
  | {
      type: "TOGGLE_DARK_MODE";
      payload: { darkMode: boolean };
    }
  | {
      type: "SET_LIST_VIEW";
      payload: { listViewType: string };
    };

export type UiContextProps = {
  state: UiState;
  action: UiAction;
};
