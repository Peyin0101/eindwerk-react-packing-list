import { usePacking } from "../context/PackingContext";
import { realCategories } from "../constants/categories";

export default function PackingFilter() {
  const { state, dispatch } = usePacking();
  const filters = ["Alle", ...realCategories];

  const handleFilterClick = (filter) => {
    if (filter === "Alle") {
      dispatch({ type: "SET_FILTERS", payload: [] });
    } else {
      if (state.selectedFilters.includes(filter)) {
        dispatch({
          type: "REMOVE_FILTER",
          payload: filter,
        });
      } else {
        dispatch({
          type: "ADD_FILTER",
          payload: filter,
        });
      }
    }
  };

  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => handleFilterClick(filter)}
          className={`px-3 py-1 rounded cursor-pointer ${
            state.selectedFilters.includes(filter)
              ? "bg-blue-500 text-white cursor-pointer"
              : filter === "Alle" && state.selectedFilters.length === 0
              ? "bg-blue-500 text-white cursor-pointer"
              : "bg-gray-200 cursor-pointer"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
