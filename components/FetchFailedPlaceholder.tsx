import React from "react";

interface FetchFailedPlaceholderProps {
  label: string;
  btnText?: string;
  btnAction?: () => void;
}

function FetchFailedPlaceholder({
  label,
  btnText = "Try again",
  btnAction = () => {},
}: FetchFailedPlaceholderProps) {
  return (
    <div className="flex flex-wrap gap-4 justify-center sm:justify-start items-center">
      <span className="text-lg">{label}</span>
      <button
        className="btn normal-case btn-outline"
        onClick={() => {
          btnAction();
        }}
      >
        {btnText}
      </button>
    </div>
  );
}

export default FetchFailedPlaceholder;
