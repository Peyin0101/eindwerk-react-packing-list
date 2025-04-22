import { usePacking } from "../context/PackingContext";

export default function PackingList() {
  const { state, dispatch } = usePacking();
  const selectedFilters = state.selectedFilters;

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

  return (
    <div className="space-y-6">
      {Object.keys(groupedItems).map((category) => (
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
                          dispatch({ type: "TOGGLE_PACKED", payload: item.id })
                        }
                        className="bg-green-500 text-white px-2 py-1 rounded cursor-pointer"
                      >
                        Pack
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
                          dispatch({ type: "TOGGLE_PACKED", payload: item.id })
                        }
                        className="bg-yellow-500 text-white px-2 py-1 rounded cursor-pointer"
                      >
                        Unpack
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
          </div>
        </div>
      ))}
    </div>
  );
}
