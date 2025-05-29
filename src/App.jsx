import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CoverColorProvider } from "./contexts/CoverColorContext";
import SelectBook from "./pages/SelectBook";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage";
import "./global.css";
import Home from "./pages/Home";
import BookSearch from "./pages/BookSearch";

function App() {
  return (
    <CoverColorProvider>
      <Router>
        <Routes>
          <Route path="/selectbook" element={<SelectBook />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/booksearch" element={<BookSearch />} />
        </Routes>
      </Router>
    </CoverColorProvider>
  );
}

export default App;
