import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyPageHeader from "./components/MyPageHeader";
import { CoverColorProvider } from "./contexts/CoverColorContext";
import SelectBook from "./pages/SelectBook";
import MyPage from "./pages/MyPage";
import "./global.css";
import Home from "./pages/Home";

function App() {
  return (
    <CoverColorProvider>
      <Router>
        <Routes>
          <Route path="/selectbook" element={<SelectBook />} />
          <Route path="/mypageheader" element={<MyPageHeader />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </Router>
    </CoverColorProvider>
  );
}

export default App;
