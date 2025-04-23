import { usePacking } from "../context/PackingContext";
import { realCategories } from "../constants/categories";

export default function PackingList() {
  const { state, dispatch } = usePacking();
  const selectedFilters = state.selectedFilters;

  const hasSavedItems =
    typeof localStorage !== "undefined" &&
    localStorage.getItem("packing-items") &&
    JSON.parse(localStorage.getItem("packing-items")).length > 0;

  const filteredItems =
    selectedFilters.length === 0 || selectedFilters.includes("Alle")
      ? state.items
      : state.items.filter((item) => selectedFilters.includes(item.category));

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const totalItems = state.items.length;
  const packedItems = state.items.filter((item) => item.packed).length;
  const percentage =
    totalItems === 0 ? 0 : Math.round((packedItems / totalItems) * 100);

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span
            className={`text-sm font-semibold ${
              percentage === 100 ? "text-green-600" : "text-red-600"
            }`}
          >
            Ingepakt: {percentage}%
          </span>
          <span className="text-sm text-gray-700">
            {packedItems} / {totalItems} items
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-300 ${
              percentage === 100 ? "bg-green-500" : "bg-red-500"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      {realCategories
        .filter((category) => groupedItems[category])
        .map((category) => (
          <div key={category}>
            <h2 className="font-semibold text-xl mb-2 text-blue-600">
              {category}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="border p-4 rounded shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-red-500">
                  Nog inpakken
                </h3>
                {groupedItems[category]
                  .filter((item) => !item.packed)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center mb-2 border-b pb-1"
                    >
                      <span className="font-semibold">{item.text}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            dispatch({
                              type: "TOGGLE_PACKED",
                              payload: item.id,
                            })
                          }
                          className="bg-green-500 text-white px-2 py-1 rounded cursor-pointer"
                        >
                          Pack
                        </button>
                        <button
                          onClick={() => {
                            const confirmDelete = window.confirm(
                              `Weet je zeker dat je "${item.text}" wil verwijderen?`
                            );
                            if (confirmDelete) {
                              dispatch({
                                type: "REMOVE_ITEM",
                                payload: item.id,
                              });
                            }
                          }}
                          className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
                        >
                          Verwijder
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="border p-4 rounded shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-green-500">
                  In koffer
                </h3>
                {groupedItems[category]
                  .filter((item) => item.packed)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center mb-2 border-b pb-1"
                    >
                      <span className="font-semibold">{item.text}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            dispatch({
                              type: "TOGGLE_PACKED",
                              payload: item.id,
                            })
                          }
                          className="bg-yellow-500 text-white px-2 py-1 rounded cursor-pointer"
                        >
                          Unpack
                        </button>
                        <button
                          onClick={() => {
                            const confirmDelete = window.confirm(
                              `Weet je zeker dat je "${item.text}" wil verwijderen?`
                            );
                            if (confirmDelete) {
                              dispatch({
                                type: "REMOVE_ITEM",
                                payload: item.id,
                              });
                            }
                          }}
                          className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
                        >
                          Verwijder
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      <div className="flex justify-end mt-6">
        <button
          onClick={() => {
            const confirmReset = window.confirm(
              "Weet je zeker dat je de volledige lijst wil wissen?"
            );
            if (confirmReset) {
              localStorage.removeItem("packing-items");
              window.location.reload();
            }
          }}
          disabled={!hasSavedItems}
          className={`px-4 py-2 rounded shadow transition text-white ${
            hasSavedItems
              ? "bg-gray-600 hover:bg-gray-700 cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Reset lijst
        </button>
      </div>
    </div>
  );
}
