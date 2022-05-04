import React from "react";
import CircularProgress from "../CircularProgress";

function LoadingPlaceholderDetails({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 p-8 text-xl font-semibold">
      <CircularProgress size={4} />
      {label}
    </div>
  );
}

export default LoadingPlaceholderDetails;
