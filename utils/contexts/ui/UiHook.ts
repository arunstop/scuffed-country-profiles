import { UiContext } from "./UiContext";
import { useContext } from "react";

export const useUiContext = () => {
  const { state, action } = useContext(UiContext);
  return { state, action };
};
