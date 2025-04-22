import { createContext, useContext, useReducer } from "react";

const PackingContext = createContext();

const initialState = {
  items: JSON.parse(localStorage.getItem("packing-items")) || [],
  selectedFilters: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      const updatedItems = [...state.items, action.payload];
      localStorage.setItem("packing-items", JSON.stringify(updatedItems));
      return { ...state, items: updatedItems };

    case "REMOVE_ITEM":
      const remaining = state.items.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("packing-items", JSON.stringify(remaining));
      return { ...state, items: remaining };

    case "TOGGLE_PACKED":
      const toggled = state.items.map((item) =>
        item.id === action.payload ? { ...item, packed: !item.packed } : item
      );
      localStorage.setItem("packing-items", JSON.stringify(toggled));
      return { ...state, items: toggled };

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
  return (
    <PackingContext.Provider value={{ state, dispatch }}>
      {children}
    </PackingContext.Provider>
  );
}

export function usePacking() {
  return useContext(PackingContext);
}
