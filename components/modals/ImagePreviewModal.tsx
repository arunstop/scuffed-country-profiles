import React from "react";
import { MdClose } from "react-icons/md";
import { Country } from "../../utils/data/models/Country";

function ImagePreviewModal({ country }: { country: Country }) {
  return (
    <div>
      <input
        type={"checkbox"}
        id="img-preview-modal"
        className="modal-toggle"
      />
      <label
        htmlFor="img-preview-modal"
        className="modal modal-bottom bg-base-100/80"
      >
        <label
          className="modal-box h-screen !max-h-screen sm:w-auto sm:max-w-full 
          sm:max-h-full cursor-auto p-0 transition-all 
          shadow-none bg-transparent rounded-none pointer-events-none"
          htmlFor=""
        >
          <div className="flex flex-col h-full">
            <div
              className="inline-flex items-center justify-between p-4 bg-base-100 
            rounded-b-box sm:border-2 sm:border-t-0 border-b-2 border-base-content/30 
            sm:mx-2 pointer-events-auto"
            >
              <h3 className="text-xl font-semibold">
                Flags of {country.name.common}
              </h3>
              <div className="flex items-center gap-4">
                <a
                  className="btn-outline btn btn-sm normal-case"
                  href={country.flags.svg}
                  target={"_blank"}
                  rel="noreferrer"
                >
                  Open original
                </a>
                <label
                  htmlFor="img-preview-modal"
                  className="btn-outline btn btn-error btn-sm btn-circle"
                >
                  <MdClose className="text-2xl" />
                </label>
              </div>
            </div>
            <div className="flex justify-center overflow-hidden p-4 my-auto">
              <img
                className="max-h-full max-w-full min-w-screen 
                pointer-events-auto ring-2 ring-slate-600/30"
                src={country.flags.svg}
              />
            </div>
          </div>
        </label>
      </label>
    </div>
  );
}

export default ImagePreviewModal;
