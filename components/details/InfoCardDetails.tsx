import React, { ReactNode } from "react";

interface InfoCardDetailsProps {
  icon: ReactNode;
  title: string;
  details: { lead: string; desc: string }[];
}
const RENDER_HEADER = (icon: ReactNode, title: string) => (
  <h1
    className="flex items-center gap-2 border-b-2
  border-base-content/10 bg-base-300 p-4 text-2xl font-bold"
  >
    {icon}
    {title}
  </h1>
);
const RENDER_DETAILS_ITEM = (lead: string, desc: string) => (
  <p key={lead}>
    <span className="font-bold">{lead}</span> <span className="">{desc}</span>
  </p>
);

function InfoCardDetails({ icon, title, details = [] }: InfoCardDetailsProps) {
  return (  
    <div className="card rounded-none sm:rounded-md sm:max-w-[30rem] grow bg-base-300/50 shadow-lg">
      <div className="flex flex-col">
        {RENDER_HEADER(icon, title)}
        <div className="flex flex-col gap-2 p-8 pt-4">
          {details.map((dItem) => RENDER_DETAILS_ITEM(dItem.lead, dItem.desc))}
        </div>
      </div>
    </div>
  );
}

export default InfoCardDetails;
