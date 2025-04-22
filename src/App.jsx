import { useState } from "react";
import PackingList from "./components/PackingList";
import PackingFilter from "./components/PackingFilter";
import PackingForm from "./components/PackingForm";
import { PackingProvider } from "./context/PackingContext";
import "./App.css";

function App() {
  return (
    <PackingProvider>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Packing List</h1>
        <PackingForm />
        <PackingFilter />
        <PackingList />
      </div>
    </PackingProvider>
  );
}

export default App;
