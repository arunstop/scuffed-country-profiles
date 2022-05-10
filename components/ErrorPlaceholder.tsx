import { useRouter } from "next/router";
import React from "react";

function ErrorPlaceholder({ message }: { message: string }) {
  const router = useRouter();
  return (
    <div className="flex h-screen w-screen">
      <div className="flex flex-col gap-4 m-auto">
        <span className="text-2xl font-bold">Error Occured</span>
        <p className="">
          Something fishy has just happened here : <br />
          <span className="text-error">{message}</span>
        </p>
        <button className="btn btn-primary" onClick={() => router.reload()}>
          Try Again
        </button>
      </div>
    </div>
  );
}

export default ErrorPlaceholder;
