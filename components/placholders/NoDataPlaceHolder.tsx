import React from "react";

interface NoDataPlaceHolderProps {
  message: string;
}

function NoDataPlaceHolder({ message }: NoDataPlaceHolderProps) {
  return <div className="text-center">{message}</div>;
}

export default NoDataPlaceHolder;
