import React from "react";

const DownloadAppButton = ({ bg }: { bg?: string }) => {
  return (
    <button
      className={`rounded border px-8 py-2 text-sm font-semibold cursor-not-allowed ${
        bg ? bg : "bg-white"
      }`}
      disabled
    >
      Download App
    </button>
  );
};

export default DownloadAppButton;
