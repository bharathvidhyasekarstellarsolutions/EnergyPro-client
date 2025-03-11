import React from "react";

const Filters = ({ categories, setCategory }) => {
  return (
    <select
      className="px-4 py-2 border rounded-md bg-white text-black"
      onChange={(e) => setCategory(e.target.value)}
    >
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
};

export default Filters;
