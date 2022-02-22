import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { UserProfile } from "./components/UserProfile";
import { AuthContextComponent } from "./context/UserContext";
import PrivateRoutes from "./PrivateRouter/PrivateRoutes";

function App() {
  return (
    <BrowserRouter>
      <AuthContextComponent>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Register />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<UserProfile />} />
          </Route>
        </Routes>
      </AuthContextComponent>
    </BrowserRouter>
  );
}

export default App;
