import React from "react";
import { BiSearch } from "react-icons/bi";

function HeroSection() {
  return (
    <section
      className="flex h-screen w-full justify-center bg-base-200 bg-fixed p-8"
      style={{
        backgroundImage: "url(/terazzo-globe.svg)",
      }}
    >
      <label
        className="m-auto flex max-w-xl flex-col items-center
        justify-center gap-8 rounded-xl bg-base-100/30 p-8 shadow-lg ring-2 ring-primary/30
        backdrop-blur-lg"
      >
        <p className="text-center text-3xl sm:text-5xl font-bold text-base-content">
          Browse every country in the world!
        </p>
        <a
          className="btn btn-primary sm:btn-lg w-52 sm:w-72 justify-between gap-2 rounded-full normal-case items-center"
          href="#countries"
        >
          <span className="text-lg sm:text-2xl font-bold my-auto">Browse</span>
          <BiSearch className="rotate-90 text-2xl sm:text-4xl my-auto" />
        </a>
      </label>
    </section>
  );
}

export default HeroSection;
