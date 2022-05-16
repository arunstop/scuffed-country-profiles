import React, { ReactNode } from "react";

export default function SectionTitleDetails({
  icon,
  title,
}: {
  title: string;
  icon?: ReactNode;
}) {
  return (
    <h2
      className="self-start rounded-t-lg border-b-2 
      border-base-content/10 bg-base-300 p-4 text-2xl font-bold
      rounded-tl-none sm:rounded-tl-lg inline-flex gap-2 items-center"
    >
      {icon}
      {title}
    </h2>
  );
}
