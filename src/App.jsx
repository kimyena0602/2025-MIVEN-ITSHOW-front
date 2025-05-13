import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyPageHeader from "./components/MyPageHeader";
import SelectBook from "./pages/SelectBook";
import "./reset.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/selectbook" element={<SelectBook />} />
        <Route path="/mypageheader" element={<MyPageHeader />} />
      </Routes>
    </Router>
  );
}

export default App;
