import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/dashboard" className="text-indigo-600 text-xl font-bold">
        AI Quiz Generator-By Khushi Jain
      </Link>
      <button
        onClick={handleLogout}
        className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-2 rounded-lg font-medium"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
