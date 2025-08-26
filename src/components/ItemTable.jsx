import React from "react";

export default function ItemTable({ items, removeItem, total }) {
  return (
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
              ₦{(Number(item.quantity) * Number(item.rate)).toLocaleString()}
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
          <td className="border p-2">₦{total.toLocaleString()}</td>
          <td className="border p-2 no-pdf"></td>
        </tr>
      </tfoot>
    </table>
  );
}
