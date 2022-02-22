import { logout } from "../firebase/firebase-config";
import { useNavigate } from "react-router";

export const UserProfile = () => {
  const navigate = useNavigate()
  
  const handlelogout = async () => {
    try {
      await logout();
      localStorage.clear();
      navigate("/login")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>User logged</h1>
      <button onClick={handlelogout}> Sign Out </button>
    </div>
  );
};
