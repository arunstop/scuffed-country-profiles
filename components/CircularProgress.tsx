import React, { CSSProperties } from "react";

function CircularProgress({ size }: { size: number }) {
  return (
    <div
      className="radial-progress animate-spin"
      style={
        {
          "--value": "60",
          "--size": `${size}rem`,
          "--thickness": `${size * (15 / 100)}rem`,
        } as CSSProperties
      }
    />
  );
}

export default CircularProgress;
