import React from "react";
interface MainSectionFilterChip {
  selected: boolean;
  text: string;
}
export const MainSectionFilterChip = ({
  selected,
  text,
}: MainSectionFilterChip) => {
  function renderChip(isOn: boolean) {
    return (
      <div
        className={`btn normal-case rounded-lg  
        ${isOn ? "swap-on btn-primary" : "swap-off btn-ghost btn-active"}
        `}
      >
        {text}
      </div>
    );
  }
  return (
    <label className="swap ">
      <input type={"checkbox"} />
      {renderChip(true)}
      {renderChip(false)}
    </label>
  );
};
