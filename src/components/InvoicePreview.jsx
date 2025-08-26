import React from "react";
import ItemTable from "./ItemTable";
import SignatureSection from "./SignatureSection";
import FooterSection from "./FooterSection";

export default function InvoicePreview({
  invoiceRef,
  receiptNo,
  date,
  recipient,
  items,
  removeItem,
  getTotal,
  amountWords,
  company,
  signature,
}) {
  return (
    <div className="col-span-7 flex justify-center">
      <div
        ref={invoiceRef}
        className="relative bg-white text-black w-[200mm] min-h-[287mm] p-[15mm] box-border mx-auto rounded-md shadow-lg flex flex-col"
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
        <ItemTable items={items} removeItem={removeItem} getTotal={getTotal} />

        {/* Amount in Words */}
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

        {/* Signatures */}
        <SignatureSection company={company} signature={signature} />

        {/* Footer */}
        <FooterSection company={company} />
      </div>
    </div>
  );
}
