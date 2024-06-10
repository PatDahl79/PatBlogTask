import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { auth } from "../firebase";
import Logo from "../assets/Logo-dark.png"

const Navbar = () => {
  const { user, userName } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <ul className="flex items-center justify-between text-white sticky inset-0 z-20 h-max max-w-full border-none rounded-none py-2 px-4 lg:px-8 lg:py-2">
      <li><Link  to="/"><img className="w-20 h-15" src={Logo} alt="Logo" /></Link></li>
      <li><Link  to="/">Home</Link></li>
      {user && (
        <>
          <li><Link to="/allblogs">All Blogs</Link></li>
          <li><Link to="/createpost">Create Blog</Link></li>
          <li><button onClick={handleLogout} >Logout</button></li>
        </>
      )}
    </ul>  
  )
}

export default Navbar;
