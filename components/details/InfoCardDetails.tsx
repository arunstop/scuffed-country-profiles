import React, { ReactNode } from "react";
import SectionTitleDetails from "./SectionTitleDetails";

interface InfoCardDetailsProps {
  icon: ReactNode;
  title: string;
  details: { lead: string; desc: string }[];
}

const RENDER_DETAILS_ITEM = (lead: string, desc: string) => (
  <p key={lead}>
    <span className="font-bold">{lead}</span> <span className="">{desc}</span>
  </p>
);

function InfoCardDetails({ icon, title, details = [] }: InfoCardDetailsProps) {
  return (  
    <div className="card grow rounded-none shadow-lg sm:max-w-[30rem]">
      <div className="flex flex-col">
        <SectionTitleDetails title={title} icon={icon}/>
        <div className="flex flex-col gap-2 rounded-none bg-base-300/50 p-8 pt-4 sm:rounded-lg sm:!rounded-tl-none">
          {details.map((dItem) => RENDER_DETAILS_ITEM(dItem.lead, dItem.desc))}
        </div>
      </div>
    </div>
  );
}

export default InfoCardDetails;
