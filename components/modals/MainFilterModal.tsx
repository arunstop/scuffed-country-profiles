import React from "react";
import { MdClose } from "react-icons/md";
import MainSectionFilter from "../sections/main/MainSectionFilter";

function MainFilterModal() {
  return (
    <div>
      <input
        type={"checkbox"}
        id="main-filter-modal"
        className="modal-toggle"
      />
      <label
        htmlFor="main-filter-modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <label className="modal-box max-h-screen cursor-auto p-0 transition-all" htmlFor="">
          <div className="flex flex-col gap-4  p-4">
            <div className="inline-flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Filter</h3>
              <label
                id="main-filter-modal-close-btn"
                className="btn-outline btn btn-error btn-sm btn-circle"
                htmlFor="main-filter-modal"
              >
                <MdClose className="text-2xl" />
              </label>
            </div>
            <div className="flex h-96 flex-col overflow-auto pr-4 items-start">
              <MainSectionFilter />
            </div>
          </div>
        </label>
      </label>
    </div>
  );
}

export default MainFilterModal;
