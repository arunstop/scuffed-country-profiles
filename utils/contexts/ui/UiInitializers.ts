import { MdCallToAction, MdViewList, MdViewModule } from "react-icons/md";
import { UiState } from "../../data/types/UiTypes";
export const INIT_UI_STATE: UiState = {
  darkMode: false,
  viewType: {
    list: [
      { type: "LIST", icon: MdViewList({}) },
      { type: "TILES", icon: MdViewModule({}) },
      { type: "CARDS", icon: MdCallToAction({}) },
    ],
    selected: "LIST",
  },
};
