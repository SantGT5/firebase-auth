import { logout } from "../firebase/firebase-config";

export const UserProfile = () => {
  
  const handlelogout = async () => {
    try {
      await logout();
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
