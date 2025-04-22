import { useRef, useState } from "react";
import { usePacking } from "../context/PackingContext";
import {
  categoriesWithPlaceholder,
  realCategories,
} from "../constants/categories";

export default function PackingForm() {
  const { dispatch } = usePacking();
  const [text, setText] = useState("");
  const [category, setCategory] = useState(categoriesWithPlaceholder[0]);
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || category === categoriesWithPlaceholder[0]) return;

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: Date.now(),
        text,
        category,
        packed: false,
      },
    });

    setText("");
    setCategory(categoriesWithPlaceholder[0]);
    inputRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 flex-wrap mb-4">
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border rounded p-2 flex-1"
        placeholder="Item toevoegen..."
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded p-2 cursor-pointer"
      >
        {categoriesWithPlaceholder.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className={`px-4 py-2 rounded text-white ${
          text.trim() === "" || category === categoriesWithPlaceholder[0]
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 cursor-pointer"
        }`}
        disabled={
          text.trim() === "" || category === categoriesWithPlaceholder[0]
        }
      >
        Voeg toe
      </button>
    </form>
  );
}
