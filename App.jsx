import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css';
import Home from "./pages/Home";
import AddEdit from "./pages/AddEdit";
import View from "./pages/View";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/addContact" element={<AddEdit />} />
        <Route path="/update/:id" element={<AddEdit />} />
        <Route path="/view/:id" element={<View />} />
      </Routes>
    <div className="App">
    </div>
    </BrowserRouter>
  );
}

export default App;
