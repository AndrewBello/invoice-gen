import React from "react";

export default function FooterSection({ company }) {
  return (
    <div
      className="absolute bottom-6 left-0 right-0 text-center text-xs border-t-4 pt-2"
      style={{ borderColor: "#1e3a8a", color: "#1e3a8a" }}
    >
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
