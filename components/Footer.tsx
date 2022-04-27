import React from "react";
import { BiGlobeAlt } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content">
      <div>
        <BiGlobeAlt className="text-[5rem]" />
        <p className="text-lg">
          <b className="font-bold">Country Profiles</b>
          <br />
          Profiles of all country in the world
        </p>
      </div>
      <div>
        <span className="footer-title">Connect</span>
        <div className="flex flex-wrap gap-4 text-4xl">
          <BsGithub />
        </div>
      </div>
    </footer>
  );
}
