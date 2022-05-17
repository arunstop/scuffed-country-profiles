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
    <label
      id="scroll-to-top-btn"
      className="transition-all btn btn-square btn-primary 
      fixed bottom-0 right-0 opacity-0
      m-4 sm:m-8 mb-2 sm:mb-4"
      onClick={(ev) => {
        // alert(getMainContainer());
        scrollToTop(true);
      }}
    >
      <FaChevronUp className="text-3xl" />
    </label>
    // </div>
  );
}

export default ScrollToTopButton;
