//   main next container
export const getMainContainer = () => document.getElementById("__next");

export function scrollToTop(smooth = false) {
  const mainContainer = getMainContainer();
  const scrollToTopButton = getScrollToTopButton();

  if (!mainContainer) return;
  if (!scrollToTopButton) return;
  if (mainContainer.scrollTop === 0) return;
  //   console.log(document.getElementById("__next") === mainContainer);
  if (smooth) {
    mainContainer.scroll({
      top: 0,
      behavior: "smooth",
    });
  } else {
    mainContainer.scrollTop = 0;
  }
  //   console.log(mainContainer);
}

export const getScrollToTopButton = () =>
  document.getElementById("scroll-to-top-btn");

export function mainContainerOnScrollListener() {
  const mainContainer = getMainContainer();
  const scrollToTopButton = getScrollToTopButton();
  if (!mainContainer) return;
  if (!scrollToTopButton) return;
  mainContainer.onscroll = (ev) => {
    if (mainContainer.scrollTop > 40) {
      //   console.log("block");
      //   scrollToTopButton!.style.visibility = "visible";
      //   scrollToTopButton.style.opacity = "1";
      scrollToTopButton.classList.add("m-4", "sm:m-8", "mb-2", "sm:mb-4");
      scrollToTopButton.classList.remove("opacity-0");
      scrollToTopButton.classList.remove("pointer-events-none");
      //   scrollToTopButton!.style.width = "0%";
    } else {
      //   console.log("none");
      //   scrollToTopButton!.style.visibility = "hidden";
      scrollToTopButton.classList.remove("m-4", "sm:m-8", "mb-2", "sm:mb-4");
      scrollToTopButton.classList.add("opacity-0");
      scrollToTopButton.classList.add("pointer-events-none");
      //   scrollToTopButton.style.opacity = "0";
    }
  };
}
