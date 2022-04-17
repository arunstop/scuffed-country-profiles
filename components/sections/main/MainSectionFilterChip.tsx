import React from "react";
interface MainSectionFilterChip {
  checked: boolean;
  text: string;
  onClick?: (status: boolean) => void;
}
const MainSectionFilterChip = ({
  checked,
  text,
  onClick = () => {},
}: MainSectionFilterChip) => {
  function RENDER_CHIP(isOn: boolean) {
    return (
      <div
        className={`btn normal-case rounded-lg border-[3px] group-hover:shadow-lg transition-colors
        ${
          isOn
            ? "swap-on btn-primary group-hover:border-base-content"
            : "swap-off btn-ghost btn-active group-hover:border-base-content"
        }
        `}
        // onClick={() => onClick()}
      >
        {text}
      </div>
    );
  }
  return (
    <label className="swap group ">
      <input
        checked={checked}
        type={"checkbox"}
        onChange={(e) => {
          onClick(e.target.checked);
        }}
      />
      {RENDER_CHIP(true)}
      {RENDER_CHIP(false)}
    </label>
  );
};

export default MainSectionFilterChip;
