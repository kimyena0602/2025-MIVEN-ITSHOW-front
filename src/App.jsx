import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyPageHeader from "./components/MyPageHeader";
import { CoverColorProvider } from "./contexts/CoverColorContext";
import SelectBook from "./pages/SelectBook";
import MyPage from "./pages/MyPage";
import "./global.css";

function App() {
  return (
    <CoverColorProvider>
      <Router>
        <Routes>
          <Route path="/selectbook" element={<SelectBook />} />
          <Route path="/mypageheader" element={<MyPageHeader />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </Router>
    </CoverColorProvider>
  );
}

export default App;
