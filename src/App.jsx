import React, { useRef, useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import gsslLogo from "./assets/gssl-logo.jpg";
import innovativeLogo from "./assets/innovative-logo.png";
import signature from "./assets/signature.png";
import { toWords } from "number-to-words";

// Default companies list
const companies = {
  innovative: {
    name: "INNOVATIVE MULTI CONCEPT",
    logo: innovativeLogo,
    account: {
      name: "Innovative Multi Concept",
      number: "1011120459",
      bank: "Zenith Bank",
    },
    footer: {
      locations: [
        {
          label: "LAGOS",
          value:
            "3B Tunde Gabby Street, Behind County Hospital, Ogba Aguda, Lagos, Nigeria.",
        },
        {
          label: "ABUJA",
          value:
            "Suite 15 & 16, ZM Plaza, Ahmedu Bello Way, Area 11, Garki, Abuja, Nigeria.",
        },
        {
          label: "KANO",
          value:
            " Suite 63/54, Yayo GSM Plaza, Farm Center Market, Off Zaira Road, Kano, Nigeria.",
        },
      ],
      tel: "08023033816, 08034114760",
      email: "innovativemulticoncepts@gmail.com",
      web: "www.innovativegroupsng.com",
    },
  },
  gssl: {
    name: "GLOBAL SIGHTS SERVICES LIMITED",
    logo: gsslLogo,
    account: {
      name: "Global Sights Services Ltd",
      number: "0025927051",
      bank: "Stanbic IBTC",
    },
    footer: {
      locations: [
        {
          label: "LAGOS",
          value:
            "3B Tunde Gabby Street, Behind County Hospital, Ogba Aguda, Lagos, Nigeria.",
        },
        {
          label: "ABUJA",
          value:
            "Suite 15 & 16, ZM Plaza, Ahmedu Bello Way, Area 11, Garki, Abuja, Nigeria.",
        },
        {
          label: "KANO",
          value:
            " Suite 63/54, Yayo GSM Plaza, Farm Center Market, Off Zaira Road, Kano, Nigeria.",
        },
      ],
      tel: "08023033816, 08034114760",
      email: "info@gssl.com",
      web: "www.gssl.com",
    },
  },
  techeye: {
    name: "TECH EYE LIMITED",
    logo: gsslLogo,
    account: {
      name: "Tech Eye Ltd",
      number: "3344556677",
      bank: "GTBank",
    },
    footer: {
      locations: [
        {
          label: "LAGOS",
          value:
            "3B Tunde Gabby Street, Behind County Hospital, Ogba Aguda, Lagos, Nigeria.",
        },
        {
          label: "ABUJA",
          value:
            "Suite 15 & 16, ZM Plaza, Ahmedu Bello Way, Area 11, Garki, Abuja, Nigeria.",
        },
        {
          label: "KANO",
          value:
            " Suite 63/54, Yayo GSM Plaza, Farm Center Market, Off Zaira Road, Kano, Nigeria.",
        },
      ],
      tel: "08023033816, 08034114760",
      email: "support@techeye.com",
      web: "www.techeye.com",
    },
  },
};

export default function InvoiceGenerator() {
  const invoiceRef = useRef();

  const [receiptNo, setReceiptNo] = useState("0001");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [recipient, setRecipient] = useState({ name: "", address: "" });
  const [amountWords, setAmountWords] = useState("");

  // default company
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
        ignoreElements: (el) => el.classList.contains("no-pdf"),
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all"] },
    };

    html2pdf().set(options).from(element).save();
  };

  const handleCompanyChange = (e) => {
    const selected = companies[e.target.value];
    setCompany(selected);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Invoice</h1>

      <div className="grid grid-cols-10 gap-6">
        {/* Left - Inputs */}
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
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              Add Item
            </button>
          </div>

          <button
            onClick={downloadPDF}
            className="mt-4 px-4 py-2 rounded bg-green-600 text-white"
          >
            Generate PDF
          </button>
        </div>

        {/* Right - Preview */}
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
                        className="px-2 py-1 rounded bg-red-600 text-white"
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
            <div className="flex justify-between  items-end mt-auto mb-24">
              {/* Left Signature */}
              <div className="w-1/2 text-center">
                <img
                  src={signature}
                  alt="Signature"
                  className="h-12 mx-auto mt-[-20px]"
                />
                <div className="border-t border-black w-40 mx-auto"></div>
                <p className="mt-2 font-semibold">FOR: {company.name}</p>
              </div>

              {/* Right Signature */}
              <div className="w-1/2 text-center">
                <div className="border-t border-black w-40 mx-auto"></div>
                <p className="mt-2 font-semibold">Recipient</p>
              </div>
            </div>

            {/* Footer */}
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
          </div>
        </div>
      </div>
    </div>
  );
}
