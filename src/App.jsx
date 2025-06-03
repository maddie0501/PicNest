import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/Homepage";
import LoginPage from "./components/LoginPage";
import Signuppage from "./components/Signuppage";
import FavImages from "./components/FavImages";
import ExplorePage from "./components/ExplorePage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/likedimg" element={<FavImages />} />
        <Route path = "/explore" element = {<ExplorePage />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
