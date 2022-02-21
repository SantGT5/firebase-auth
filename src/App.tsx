import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { UserProfile } from "./components/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
