import "./App.css";
import Home from "./components/home/Home";
import {Routes, Route } from "react-router-dom";
import FormAdd from './components/formAdd/FormAdd'
import FormEdit from './components/formEdit/FormEdit'

function App() {
  return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<FormAdd />} />
          <Route path="/edit" element={<FormEdit />} />
        </Routes>
  );
}
export default App;
