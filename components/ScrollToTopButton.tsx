import React, { useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";
import {
  mainContainerOnScrollListener,
  scrollToTop,
} from "../utils/helpers/UIHelpers";

function ScrollToTopButton() {
  useEffect(() => {
    mainContainerOnScrollListener();

    return () => {};
  }, []);

  return (
    // <div
    //   className=" transition-all overflow-hidden"
    // >
    <button
      id="scroll-to-top-btn"
      className="transition-all btn btn-square btn-primary fixed bottom-0 right-0 opacity-0"
      onClick={(ev) => {
        // alert(getMainContainer());
        scrollToTop();
      }}
    >
      <FaChevronUp className="text-3xl" />
    </button>
    // </div>
  );
}

export default ScrollToTopButton;
