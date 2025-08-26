import React, { useRef, useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import signature from "./assets/signature.png";
import { toWords } from "number-to-words";

import { companies } from "./data/companies";
import InvoicePreview from "./components/InvoicePreview";

export default function App() {
  const invoiceRef = useRef();

  const [receiptNo, setReceiptNo] = useState("0001");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [recipient, setRecipient] = useState({ name: "", address: "" });
  const [amountWords, setAmountWords] = useState("");
  const [company, setCompany] = useState(companies.innovative);

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

  const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

  const getTotal = () =>
    items.reduce(
      (sum, item) => sum + Number(item.quantity) * Number(item.rate),
      0
    );

  useEffect(() => {
    const total = getTotal();
    setAmountWords(
      total > 0
        ? `${
            toWords(total).charAt(0).toUpperCase() + toWords(total).slice(1)
          } naira only.`
        : ""
    );
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
        ignoreElements: (el) => el.classList.contains("no-pdf"),
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all"] },
    };

    html2pdf().set(options).from(element).save();
  };

  const handleCompanyChange = (e) => setCompany(companies[e.target.value]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Invoice</h1>
      <div className="grid grid-cols-10 gap-6">
        {/* Left Inputs */}
        <div className="col-span-3">
          <div className="mb-6">
            <label className="block font-semibold mb-2">Select Company:</label>
            <select
              className="border p-2 w-full"
              onChange={handleCompanyChange}
              defaultValue="innovative"
            >
              <option value="innovative">Innovative Multiconcepts</option>
              <option value="gssl">Global Sights Services Limited</option>
              <option value="techeye">Tech Eye Limited</option>
              <option value="innovativeLTP">
                Innovative Logistics and Transportation Limited </option>
            </select>
          </div>

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
              className="px-4 py-2 rounded text-white"
              style={{ backgroundColor: "#2563eb" }}
            >
              Add Item
            </button>
          </div>

          <button
            onClick={downloadPDF}
            className="mt-4 px-4 py-2 rounded text-white"
            style={{ backgroundColor: "#16a34a" }}
          >
            Generate PDF
          </button>
        </div>

        {/* Right Preview */}
        <InvoicePreview
          invoiceRef={invoiceRef}
          receiptNo={receiptNo}
          date={date}
          recipient={recipient}
          items={items}
          removeItem={removeItem}
          getTotal={getTotal}
          amountWords={amountWords}
          company={company}
          signature={signature}
        />
      </div>
    </div>
  );
}
