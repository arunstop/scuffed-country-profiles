import React from "react";
import { BiSearch } from "react-icons/bi";

function HeroSection() {
  return (
    <section
      className="flex h-screen w-full justify-center bg-fixed bg-neutral"
      style={{
        backgroundImage: "url(/terazzo-globe.svg)",
      }}
    >
      <label className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl capitalize">Search countries</h1>
        <div className="relative flex overflow-hidden rounded-lg ">
          <input
            className="peer h-12 w-96 rounded-lg border border-purple-300 px-2 pr-[6.75rem]
            pl-3 text-lg outline-none placeholder:italic valid:border-purple-600
            "
            type={"text"}
            minLength={2}
            required
            placeholder="Indonesia..."
          />
          <button
            className={`absolute inset-y-0 right-0 my-auto flex h-12 w-24 bg-purple-300 text-4xl
            text-purple-600 transition-colors peer-valid:bg-purple-600 peer-valid:!text-purple-300 
            peer-invalid:pointer-events-none peer-invalid:!cursor-move items-center justify-center`}
            onClick={() => {
              alert("search click");
            }}
          >
            <BiSearch className="rotate-90" />
          </button>
        </div>
      </label>
    </section>
  );
}

export default HeroSection;
