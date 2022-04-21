import { UiState } from "../../data/types/UiTypes";
import { UiActionTypes } from "../../data/types/UiTypes";

export const uiReducer = (state: UiState, action: UiActionTypes): UiState => {
  const type = action.type;

  switch (type) {
    // change dark mode on state
    case "TOGGLE_DARK_MODE": {
      return { ...state, darkMode: action.payload.darkMode };
    }
    // change list view on state
    case "SET_LIST_VIEW": {
      const { listViewType } = action.payload;
      return {
        ...state,
        viewType: { ...state.viewType, selected: listViewType },
      };
    }
    case "TOGGLE_FILTERS": {
      const { filtersOn } = action.payload;
      return { ...state, filtersOn: filtersOn };
    }
    default:
      return state;
  }
};
