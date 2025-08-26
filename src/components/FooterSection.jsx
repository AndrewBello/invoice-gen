import React from "react";

export default function FooterSection({ company }) {
  return (
    <div className="absolute bottom-6 left-0 right-0 text-center text-xs text-blue-900 border-t-4 border-blue-900 pt-2">
      <p className="font-bold">{company.name}</p>
      {company.footer.locations.map((loc, i) => (
        <p key={i}>
          <span className="font-bold">{loc.label}:</span> {loc.value}
        </p>
      ))}
      <p>
        <span className="font-bold">Tel:</span> {company.footer.tel}{" "}
        <span className="font-bold">Email:</span> {company.footer.email}{" "}
        <span className="font-bold">Web:</span> {company.footer.web}
      </p>
    </div>
  );
}
