import React from "react";
import { BiSearch } from "react-icons/bi";

function HeroSection() {
  return (
    <section
      className="flex h-screen w-full justify-center bg-fixed p-8 bg-base-200"
      style={{
        backgroundImage: "url(/terazzo-globe.svg)",
      }}
    >
      <label
        className="flex flex-col items-center justify-center max-w-xl
        gap-8 p-8 m-auto bg-base-100/30 rounded-xl shadow-lg ring-2 ring-primary/30
        backdrop-blur-lg"
      >
        <p className="text-5xl text-center text-base-content">
          <h1 className=" font-bold">Browse every country in the world!</h1>
        </p>
        <a
          className="btn btn-lg gap-2 w-72 rounded-full btn-primary justify-between normal-case "
          href="#countries"
        >
          <span className="text-2xl font-bold">Browse</span>
          <BiSearch className="text-4xl rotate-90" />
        </a>
      </label>
    </section>
  );
}

export default HeroSection;
