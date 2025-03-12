import Navbar from "./assets/Components/Navbar";
import Manager from "./assets/Components/Manager";
import { Routes, Route } from "react-router-dom";
import { Home } from "./assets/Components/Home";
function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Manager />} />
      </Routes>
    </>
  );
}

export default App;
