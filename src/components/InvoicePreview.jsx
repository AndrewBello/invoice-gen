import React, { forwardRef } from "react";
import ItemTable from "./ItemTable";
import SignatureSection from "./SignatureSection";
import FooterSection from "./FooterSection";

const InvoicePreview = forwardRef(
  (
    {
      company,
      receiptNo,
      date,
      recipient,
      items,
      removeItem,
      amountWords,
      total,
    },
    ref
  ) => (
    <div
      ref={ref}
      className="relative bg-white text-black w-[200mm] min-h-[287mm] p-[15mm] mx-auto rounded-md shadow-lg flex flex-col"
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <img src={company.logo} alt="Logo" className="h-20" />
        <h1 className="text-xl font-bold">RECEIPT ({receiptNo})</h1>
      </div>

      <p className="mb-2 text-right">{date}</p>

      {/* Recipient */}
      <div className="mb-6">
        <p>
          <span className="font-bold">To:</span> {recipient.name}
        </p>
        <p className="whitespace-pre-line">{recipient.address}</p>
      </div>

      <p className="mb-4">
        <span className="font-bold">FOR:</span> {company.name}
      </p>

      {/* Items */}
      <ItemTable items={items} removeItem={removeItem} total={total} />

      <p className="mb-4">
        <span className="font-bold">Amount in Words:</span> {amountWords}
      </p>

      {/* Account */}
      <div className="mb-10">
        <h3 className="font-bold">ACCOUNT DETAILS</h3>
        <p>Account Name: {company.account.name}</p>
        <p>Account Number: {company.account.number}</p>
        <p>Bank: {company.account.bank}</p>
      </div>

      <SignatureSection company={company} />

      <FooterSection company={company} />
    </div>
  )
);

export default InvoicePreview;
