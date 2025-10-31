// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Details from "./pages/Details"; 

// const App: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState("");

//   return (
//     <Router>
//       <Navbar onSearch={setSearchQuery} />
//       <Routes>
//         <Route path="/" element={<Home searchQuery={searchQuery} />} />
//         <Route path="/details/:id" element={<Details />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;



// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Details from "./pages/Details";

// const App: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState("");

//   return (
//     <Router>
//       <Navbar onSearch={setSearchQuery} />
//       <Routes>
//         <Route path="/" element={<Home searchQuery={searchQuery} />} />
//         <Route path="/details/:id" element={<Details />} />
//         <Route path="/details/:id" element={<Details />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;



import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Checkout from "./pages/Checkout"; // 👈 Import Checkout page
import Result from "./pages/Result";

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      {/* Navbar remains constant */}
      <Navbar onSearch={setSearchQuery} />

      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home searchQuery={searchQuery} />} />

        {/* Details Page */}
        <Route path="/details/:id" element={<Details />} />

        {/* Checkout Page */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
};

export default App;

