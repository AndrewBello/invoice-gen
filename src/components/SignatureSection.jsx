import React from "react";

export default function SignatureSection({ company, signature }) {
  return (
    <div className="flex justify-between items-end mt-auto mb-24">
      {/* Left Signature */}
      <div className="w-1/2 text-center">
        <img src={signature} alt="Signature" className="h-12 mx-auto -mt-5" />
        <div className="border-t border-black w-40 mx-auto"></div>
        <p className="mt-2 font-semibold">FOR: {company.name}</p>
      </div>

      {/* Right Signature */}
      <div className="w-1/2 text-center">
        <div className="border-t border-black w-40 mx-auto"></div>
        <p className="mt-2 font-semibold">Recipient</p>
      </div>
    </div>
  );
}
