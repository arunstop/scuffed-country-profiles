export interface UiState {
  darkMode: boolean;
}

export interface UiAction {
  toggleDarkMode: (darkMode: boolean) => void;
}

export type UiActionTypes = {
  type: "TOGGLE_DARK_MODE";
  payload: { darkMode: boolean };
};

export type UiContextProps = {
  state: UiState;
  action: UiAction;
};
