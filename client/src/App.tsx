// src/App.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Checkout from "./pages/Checkout";
import Result from "./pages/Result";

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <Navbar onSearch={(query) => setSearchQuery(query)} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
};

export default App;
