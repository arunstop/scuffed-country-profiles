import NextNProgress from "nextjs-progressbar";
import React from "react";

function LinearProgress() {
  // const {
  //   state: { darkMode },
  // } = useUiContext();
  return (
    // <NextNProgress
    //   color={darkMode ? "hsl(var(--p))" : "hsl(var(--p))"}
    //   height={6}
    // />
    <NextNProgress color="hsl(var(--p))" height={6} />
  );
}

export default LinearProgress;
