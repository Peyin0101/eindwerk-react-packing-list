import { createContext, useContext, useEffect, useReducer } from "react";

const PackingContext = createContext();

const initialState = {
  items: JSON.parse(localStorage.getItem("packing-items")) || [],
  selectedFilters: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.payload] };

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "TOGGLE_PACKED":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, packed: !item.packed } : item
        ),
      };

    case "ADD_FILTER":
      if (!state.selectedFilters.includes(action.payload)) {
        return {
          ...state,
          selectedFilters: [...state.selectedFilters, action.payload],
        };
      }
      return state;

    case "REMOVE_FILTER":
      return {
        ...state,
        selectedFilters: state.selectedFilters.filter(
          (filter) => filter !== action.payload
        ),
      };

    case "SET_FILTERS":
      return { ...state, selectedFilters: [] };

    default:
      return state;
  }
}

export function PackingProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    localStorage.setItem("packing-items", JSON.stringify(state.items));
  }, [state.items]);
  return (
    <PackingContext.Provider value={{ state, dispatch }}>
      {children}
    </PackingContext.Provider>
  );
}

export function usePacking() {
  return useContext(PackingContext);
}
