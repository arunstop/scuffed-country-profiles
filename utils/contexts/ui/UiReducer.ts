import { UiState } from "../../data/types/UiTypes";
import { UiActionTypes } from "../../data/types/UiTypes";

export const uiReducer = (state: UiState, action: UiActionTypes): UiState => {
  const type = action.type;
  switch (type) {
    case "TOGGLE_DARK_MODE": {
      return { ...state, darkMode: action.payload.darkMode };
    }
  }
};
