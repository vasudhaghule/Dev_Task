import { Route, Routes } from "react-router-dom";
import LoadingScreen from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AccountInfo from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoadingScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/account" element={<AccountInfo />} />
    </Routes>
  );
}

export default App;
