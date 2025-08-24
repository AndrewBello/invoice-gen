import React, { useRef, useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import gsslLogo from "./assets/gssl-logo.jpg";
import { toWords } from "number-to-words";

export default function InvoiceGenerator() {
  const invoiceRef = useRef();

  const [receiptNo, setReceiptNo] = useState("0001");
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [recipient, setRecipient] = useState({
    name: "",
    address: "",
  });
  const [amountWords, setAmountWords] = useState("");
  const [account, setAccount] = useState({
    name: "Innovative Multi Concept",
    number: "1011120459",
    bank: "Zenith Bank",
  });
  const [company, setCompany] = useState({
    name: "INNOVATIVE MULTI CONCEPT",
    logo: gsslLogo,
  });

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    description: "",
    quantity: "",
    rate: "",
  });

  const addItem = () => {
    if (!newItem.description || !newItem.quantity || !newItem.rate) return;
    setItems([...items, newItem]);
    setNewItem({ description: "", quantity: "", rate: "" });
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const getTotal = () =>
    items.reduce(
      (sum, item) => sum + Number(item.quantity) * Number(item.rate),
      0
    );

  useEffect(() => {
    const total = getTotal();
    if (total > 0) {
      const words = toWords(total);
      setAmountWords(
        `${words.charAt(0).toUpperCase() + words.slice(1)} naira only.`
      );
    } else {
      setAmountWords("");
    }
  }, [items]);

  const downloadPDF = () => {
    const element = invoiceRef.current;
    if (!element) return;

    const options = {
      margin: 0,
      filename: `receipt-${receiptNo}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        ignoreElements: (el) => el.classList.contains("no-pdf"), // hide remove buttons
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all"] },
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Invoice</h1>

      <div className="grid grid-cols-10 gap-6">
        {/* Left - Inputs */}
        <div className="col-span-3">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <input
              className="border p-2"
              placeholder="Receipt No"
              value={receiptNo}
              onChange={(e) => setReceiptNo(e.target.value)}
            />
            <input
              type="date"
              className="border p-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              className="border p-2 col-span-2"
              placeholder="Recipient Name / Position"
              value={recipient.name}
              onChange={(e) =>
                setRecipient({ ...recipient, name: e.target.value })
              }
            />
            <textarea
              className="border p-2 col-span-2"
              placeholder="Recipient Address"
              value={recipient.address}
              onChange={(e) =>
                setRecipient({ ...recipient, address: e.target.value })
              }
            />
          </div>

          {/* Add Item */}
          <div className="mb-4 gap-2 flex flex-wrap">
            <input
              className="border p-2 mr-2"
              placeholder="Description"
              value={newItem.description}
              onChange={(e) =>
                setNewItem({ ...newItem, description: e.target.value })
              }
            />
            <input
              type="number"
              className="border p-2 mr-2 w-24"
              placeholder="Qty"
              value={newItem.quantity}
              onChange={(e) =>
                setNewItem({ ...newItem, quantity: e.target.value })
              }
            />
            <input
              type="number"
              className="border p-2 mr-2 w-32"
              placeholder="Rate"
              value={newItem.rate}
              onChange={(e) => setNewItem({ ...newItem, rate: e.target.value })}
            />
            <button
              onClick={addItem}
              style={{ backgroundColor: "rgb(37, 99, 235)", color: "#fff" }}
              className="px-4 py-2 rounded"
            >
              Add Item
            </button>
          </div>

          {/* Generate PDF Button */}
          <button
            onClick={downloadPDF}
            style={{ backgroundColor: "rgb(22, 163, 74)", color: "#fff" }}
            className="mt-4 px-4 py-2 rounded"
          >
            Generate PDF
          </button>
        </div>

        {/* Right - Preview */}
        <div className="col-span-7 flex justify-center">
          <div
            ref={invoiceRef}
            style={{
              backgroundColor: "#fff",
              color: "#000",
              width: "200mm",
              minHeight: "287mm",
              padding: "15mm",
              boxSizing: "border-box",
              margin: "0 auto",
            }}
            className="rounded-md shadow-lg overflow-auto"
          >
            <div className="flex flex-col items-center gap-4 mb-6">
              <img src={company.logo} alt="Logo" className="h-20" />
              <h1 className="text-xl font-bold">RECEIPT ({receiptNo})</h1>
            </div>

            <p className="mb-2 text-right">{date}</p>

            <div className="mb-6">
              <p>
                <span className="font-bold">To:</span> {recipient.name}
              </p>
              <p style={{ whiteSpace: "pre-line" }}>{recipient.address}</p>
            </div>

            <p className="mb-4">
              <span className="font-bold">FOR:</span> {company.name}
            </p>

            {/* Items Table */}
            <table className="w-full border-collapse mb-6 text-sm">
              <thead>
                <tr className="border-b">
                  <th className="p-2 border">S/N</th>
                  <th className="p-2 border">Qty</th>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border">Rate</th>
                  <th className="p-2 border">Amount</th>
                  <th className="p-2 border no-pdf">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i}>
                    <td className="border p-2">{i + 1}</td>
                    <td className="border p-2">{item.quantity}</td>
                    <td className="border p-2">{item.description}</td>
                    <td className="border p-2">
                      ₦{Number(item.rate).toLocaleString()}
                    </td>
                    <td className="border p-2">
                      ₦
                      {(
                        Number(item.quantity) * Number(item.rate)
                      ).toLocaleString()}
                    </td>
                    <td className="border p-2 text-center no-pdf">
                      <button
                        onClick={() => removeItem(i)}
                        style={{
                          backgroundColor: "rgb(220, 38, 38)",
                          color: "#fff",
                        }}
                        className="px-2 py-1 rounded"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-bold">
                  <td colSpan="4" className="border p-2 text-right">
                    TOTAL
                  </td>
                  <td className="border p-2">₦{getTotal().toLocaleString()}</td>
                  <td className="border p-2 no-pdf"></td>
                </tr>
              </tfoot>
            </table>

            <p className="mb-4">
              <span className="font-bold">Amount in Words:</span> {amountWords}
            </p>

            <div className="mb-6">
              <h3 className="font-bold">ACCOUNT DETAILS</h3>
              <p>Account Name: {account.name}</p>
              <p>Account Number: {account.number}</p>
              <p>Bank: {account.bank}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
