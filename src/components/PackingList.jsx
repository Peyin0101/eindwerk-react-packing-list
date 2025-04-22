import { usePacking } from "../context/PackingContext";

export default function PackingList() {
  const { state, dispatch } = usePacking();
  const selectedFilters = state.selectedFilters;
  const filteredItems =
    selectedFilters.length === 0 || selectedFilters.includes("Alle")
      ? state.items
      : state.items.filter((item) => selectedFilters.includes(item.category));

  const toPack = filteredItems.filter((item) => !item.packed);
  const packed = filteredItems.filter((item) => item.packed);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <PackingSection title="Nog inpakken" items={toPack} dispatch={dispatch} />
      <PackingSection
        title="In koffer"
        items={packed}
        dispatch={dispatch}
        packed
      />
    </div>
  );
}

function PackingSection({ title, items, dispatch, packed = false }) {
  return (
    <div className="border p-4 rounded shadow-sm">
      <h2 className="font-semibold text-xl mb-2">{title}</h2>
      {items.length === 0 && <p className="text-gray-400">Geen items</p>}
      {items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center mb-2 border-b pb-1"
        >
          <span>
            {item.text}{" "}
            <span className="text-sm text-gray-500">({item.category})</span>
          </span>
          <div className="flex gap-2">
            <button
              onClick={() =>
                dispatch({ type: "TOGGLE_PACKED", payload: item.id })
              }
              className="bg-green-500 text-white px-2 py-1 rounded cursor-pointer"
            >
              {packed ? "Unpack" : "Pack"}
            </button>
            <button
              onClick={() =>
                dispatch({ type: "REMOVE_ITEM", payload: item.id })
              }
              className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
            >
              Verwijder
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
