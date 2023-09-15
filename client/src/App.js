import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Cuisine from "./pages/Cuisine";
import Searched from "./pages/Searched";
import Recipe from "./pages/Recipe";
import Create from "./pages/Create";
import Saved from "./pages/Saved";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cuisine/:type" element={<Cuisine />} />
          <Route path="/searched/:search" element={<Searched />} />
          <Route path="/recipe/:name" element={<Recipe />} />
          <Route path="/create" element={<Create />} />
          <Route path="/saved" element={<Saved />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
